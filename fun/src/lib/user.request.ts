import { BACKEND_HOST } from "./config";
export const getUserInfo = async () => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/user/get`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(
      "Erreur lors de la récupération des infos de l'utilisateur connecté"
    );
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/user/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la déconnection");
  }
  return response.json();
};

export const getAllFriends = async () => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/user/get/friend/all`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }
  return response.json();
};

export const addFriend = async (id: number) => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/user/friend/create/${id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout d'un ami");
  }
  return response.json();
};
