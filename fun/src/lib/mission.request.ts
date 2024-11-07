import { MissionProps } from "./cards.utils";
import { BACKEND_HOST } from "./config";

export const CreateMission = async (data: MissionProps) => {
  const {
    date,
    timeStartHour,
    timeStartMin,
    timeEndHour,
    timeEndMin,
    timeStartMeridiem,
    timeEndMeridiem,
    title,
    tasks,
  } = data;
  const response = await fetch(`http://${BACKEND_HOST}:3333/mission/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date,
      timeStartHour,
      timeStartMin,
      timeEndHour,
      timeEndMin,
      timeStartMeridiem,
      timeEndMeridiem,
      title,
      tasks,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la création de la mission`);
  }
  return response.json();
};
export const getAllMissionsFromDate = async (fetchedDate: Date | undefined) => {
  const date = fetchedDate?.toISOString().split("T")[0];
  if (!fetchedDate) {
    throw new Error("Erreur lors de la récupération des missions");
  }
  const response = await fetch(
    `http://${BACKEND_HOST}:3333/mission/get?date=${date}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des missions du jour");
  }
  return response.json();
};
