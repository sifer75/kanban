import { KanbanProps } from "./cards.utils";
import { BACKEND_HOST } from "./config";
export const createKanban = async (data: KanbanProps) => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/kanban/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du kanban");
  }
  return response.json();
};

export const getAllKanban = async (workspaceId: number) => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/kanban/get/${workspaceId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des kanbans");
  }
  return response.json();
};

export const updateKanban = async (data: KanbanProps) => {
  const { id, title, description } = data;
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/kanban/update/${id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la modification du kanban");
  }
  return response.json();
};

export const deleteKanban = async (id: number) => {
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/kanban/delete/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: null,
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du kanban");
  }
  return response.json();
};
