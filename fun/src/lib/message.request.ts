import { BACKEND_HOST } from "./config";

interface sendMessageProps {
  message: string;
  friendId: number;
}
export const sendMessage = async ({ message, friendId }: sendMessageProps) => {
  const token = localStorage.getItem("auth_token");
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/tchat/${friendId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ message, friendId }),
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de l'envoie du message");
  }
  return response.json();
};
