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
  id: string;
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

export interface User {
  id: number;
  name: string;
  friendId: number;
  userId: number;
  user_id: number;
  email: string;
  password: string;
  provider: string;
  providerId: string;
  avatarUrl: string;
  avatar_url: string;
  token?: string;
}

export interface ListProps {
  setSearchFriends?: (value: string) => void;
  setSpeaking: (value: boolean) => void;
  searchFriends?: string;
}

export interface StatusSelectionProps {
  title: string;
  description: string;
}

export interface SearchFriendsProps {
  setSearchFriends: (value: string) => void;
  searchFriends: string;
}

export interface MessageProps {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: Date;
}

export interface MessageListProps {
  messages: MessageProps[];
}
