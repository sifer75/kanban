import { MessageListProps, MessageProps } from "@/lib/cards.utils";
import { getMessages } from "@/lib/message.request";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function MessageList({ messages }: MessageListProps) {
  const params = useParams();
  const friendId = Number(params.friendId);
  console.log(friendId, "friendId");
  const { data, isError, isLoading } = useQuery<MessageProps[]>({
    queryFn: () => getMessages(friendId),
    queryKey: ["messages", friendId],
    retry: false,
  });

  if (isError || isLoading || !data) return <div>caca</div>;
  const updatedMessages = messages.filter((message) => !data.includes(message));
  console.log(messages, data, updatedMessages, "tt");

  return (
    <div className="max-w-full h-full flex items-start flex-col border rounded-xl overflow-y-scroll overflow-hidden">
      {updatedMessages.map((message: MessageProps) =>
        message.senderId === friendId ? (
          <div className="w-full flex gap-3 border-b p-3" key={message.id}>
            <span className="flex items-center justify-center px-4 bg-slate-300 rounded-2xl h-8">
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
  );
}

export default MessageList;
