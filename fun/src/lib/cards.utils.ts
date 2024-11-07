export interface WorkspaceProps {
  title: string;
  description: string;
  id?: number;
}

export interface KanbanProps {
  title: string;
  description: string;
  workspaceId?: number;
  id?: number;
  updateAt?: Date;
}

export interface TaskProps {
  title: string;
  description: string;
  kanbanId?: number;
  id?: string;
  status?: "to_do" | "in_progress" | "finished";
  color?: string;
  from?: string;
  to?: string;
}
export enum Meridiem {
  AM = "AM",
  PM = "PM",
}

export interface MissionProps {
  id?: string;
  date?: string;
  timeStartHour: string;
  timeStartMin: string;
  timeEndHour: string;
  timeEndMin: string;
  timeStartMeridiem: Meridiem;
  timeEndMeridiem: Meridiem;
  title: string;
  tasks: string[];
}
