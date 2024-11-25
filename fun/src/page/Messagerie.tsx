import ButtonAcceptFriends from "@/components/friend/ButtonAcceptFriends";
import ButtonFindFriend from "@/components/friend/ButtonFindFriend";
import FriendList from "@/components/friend/FriendList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/message.request";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Transmit } from "@adonisjs/transmit-client";
import { BACKEND_HOST } from "@/lib/config";
import MessageList from "@/components/MessageList";
import { MessageProps } from "@/lib/cards.utils";

function Messagerie() {
  const params = useParams();
  const [searchFriends, setSearchFriends] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  console.log(messages, "messages");
  const [speaking, setSpeaking] = useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: sendMessage,
    mutationKey: ["message"],
    onSuccess: () => {
      setMessage("");
    },
  });

  const friendId = Number(params.friendId);
  useEffect(() => {
    const transmit = new Transmit({
      baseUrl: `http://${BACKEND_HOST}:3333`,
    });
    const subscription = transmit.subscription(`/tchat/${friendId}`);
    subscription.create();
    subscription.onMessage((message: MessageProps) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      subscription.delete();
    };
  }, [friendId]);
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-medium text-2xl">Messagerie</h1>
        <div className="flex gap-2 items-center">
          <ButtonAcceptFriends />
          <ButtonFindFriend />
        </div>
      </div>
      <Input
        placeholder="Recherche un ami ..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchFriends(e.target.value)
        }
        value={searchFriends}
      />
      <div className="w-full h-4/5 flex gap-5">
        <FriendList
          setSearchFriends={setSearchFriends}
          searchFriends={searchFriends}
          setSpeaking={setSpeaking}
        />
        {speaking ? (
          <div className="w-full h-full rounded-xl flex flex-col gap-5 bg-[#FAFBFD] p-10">
            <MessageList messages={messages} />
            <div className="flex gap-2 w-full items-end">
              <Button onClick={() => mutation.mutate({ message, friendId })}>
                Envoyer
              </Button>
              <Input
                placeholder="message ..."
                className="w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Input>
            </div>
          </div>
        ) : (
          <div className="w-full bg-[#FAFBFD] rounded-xl p-3 h-full">
            <h1 className="text-xl h-fit w-32">Tchat</h1>
            <span className="w-full flex h-full items-center justify-center">
              Aucune messagerie d'ouverte
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messagerie;
