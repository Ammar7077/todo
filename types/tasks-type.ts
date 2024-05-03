import { EditedByType } from "./edited-by-type";
import { ItemType } from "./items-type";

export interface TaskType {
  id: string;
  uid: string;
  name: string;
  description: string;
  created_date: string;
  is_shared: boolean;
  is_deleted: boolean;
  is_archived: boolean;
  is_one_time_reminder: boolean;
  remind_date_time_list: string[];
  edited_by: EditedByType[];
  items: ItemType[];
}

export interface TaskSubmtionType {
  name: number;
  description: string;
  items: string[];
}
