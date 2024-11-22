import ButtonAcceptFriends from "@/components/friend/ButtonAcceptFriends";
import ButtonFindFriend from "@/components/friend/ButtonFindFriend";
import FriendList from "@/components/friend/FriendList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchCategory } from "@/lib/cards.utils";
import { sendMessage } from "@/lib/message.request";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Transmit } from "@adonisjs/transmit-client";

interface MessageProps {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: Date;
}
function Messagerie() {
  const [searchFriends, setSearchFriends] = useState<string>("");
  const [selectedInput, setSelectedInput] = useState<SearchCategory>(
    SearchCategory.Ami
  );
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [speaking, setSpeaking] = useState<boolean>(true);
  const mutation = useMutation({
    mutationFn: sendMessage,
    mutationKey: ["message"],
    onSuccess: () => {
      setMessage("");
    },
  });
  const params = useParams();
  const friendId = Number(params.friendId);

  useEffect(() => {
    const transmit = new Transmit({
      baseUrl: "http://localhost:3333",
    });
    const subscription = transmit.subscription(`/tchat/${friendId}`);
    subscription.create();
    subscription.onMessage((message: MessageProps) => {
      setSpeaking(true);
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      setSpeaking(false);
      subscription.delete();
    };
  }, [friendId]);

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="flex flex-col gap-2 h-full">
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
        <div className="w-full h-full flex gap-5">
          <FriendList
            selectedInput={selectedInput}
            setSearchFriends={setSearchFriends}
            searchFriends={searchFriends}
          />
          {speaking ? (
            <div className="w-full h-full rounded-xl flex flex-col gap-5 bg-[#FAFBFD] p-10">
              <div className="max-w-full h-full flex items-start flex-col border rounded-xl overflow-y-scroll overflow-hidden">
                {messages.map((message) =>
                  message.senderId === 1 ? (
                    <div
                      className="w-full flex gap-3 border-b p-3"
                      key={message.id}
                    >
                      <img
                        src="ff"
                        alt="logo user"
                        className="w-8 h-8 rounded-full border"
                      ></img>
                      <span className="flex items-center justify-center px-4 bg-slate-300 rounded-2xl">
                        {message.message}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="w-full flex gap-3 border-b justify-end p-3"
                      key={message.id}
                    >
                      <span className="flex items-center justify-center px-4 bg-green-300 rounded-2xl h-8">
                        <div>
                          <span>{message.message}</span>
                        </div>
                      </span>
                    </div>
                  )
                )}
              </div>
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
            <div className="w-full h-full rounded-xl flex bg-[#FAFBFD] items-center justify-center">
              Aucune messagerie d'ouverte
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messagerie;
