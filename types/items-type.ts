import { Key } from "react";

export interface ItemType {
  id: Key | null | undefined;
  name: string;
  descrption: string;
  task_name: string;
  task_desc: string;
  is_shared: boolean;
  priority: number;
  is_checked: boolean;
}
