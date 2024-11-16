import { WorkspaceProps } from "./cards.utils";
import { BACKEND_HOST } from "./config";
export const createWorkspace = async (data: WorkspaceProps) => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/workspace/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du workspace");
  }
  return response.json();
};

export const getAllWorkspaces = async () => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/workspace/get`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du workspace");
  }
  return response.json();
};

export const updateWorkspace = async (data: WorkspaceProps) => {
  const { id, title, description } = data;
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/workspace/update/${id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la modification du workspace");
  }
  return response.json();
};

export const deleteWorkspace = async (id: number) => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/workspace/delete/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: null,
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du workspace");
  }
};
export const getSpecificWorkspace = async (id: number) => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/workspace/get/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du workspace");
  }
  return await response.json();
};
