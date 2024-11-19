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

export const getAllUsers = async () => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/user/get/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de tous les utilisateurs");
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

export const requestFriend = async (id: number) => {
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
    throw new Error("Erreur lors de la requete de l'ami");
  }
  return response.json();
};

export const AddFriend = async (id: number) => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/user/friend/add/${id}`,
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

export const DeleteRequestFriend = async (id: number) => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/user/friend/request/delete/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de la requete d'ami");
  }
  return response.json();
};
export const getAllRequestFriend = async () => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/user/friend/request/get`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des requêtes d'amis");
  }
  return response.json();
};

export const DeleteFriend = async (id: number) => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/user/friend/delete/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'ami");
  }
  return response.json();
};
