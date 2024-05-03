"use client";
import { TaskType } from "@/types/tasks-type";
import TextField from "./TextField";
import ItemComponent from "./ItemComponent";
import ShareButton from "./ShareButton";
import { useState } from "react";
import SortableList from "./SortableList";

interface TaskListProps {
  task: TaskType;
}

const TasksList: React.FC<TaskListProps> = ({ task }) => {
  const [addedItems, setAddedItems] = useState(task.items);

  function addItem() {
    setAddedItems((prev: any[]) => {
      return [
        ...prev,
        {
          item_name: `Task Name ${prev.length + 1}`,
          item_desc: "",
          priority: -1,
          is_checked: false,
        },
      ];
    });
  }

  return (
    <div>
      <div key={task.id} className="collapse bg-base-200 mt-10 p-3">
        <input type="radio" name="my-accordion-1" defaultChecked />
        <div className="collapse-title text-xl font-medium flex-grow">
          <span>{task.name}</span>
        </div>
        <div className="collapse-content">
          <div
            className="mb-10"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <TextField defaultValue={task.description} />

            <ShareButton status={task.is_shared} id={task.id} />
          </div>

          {addedItems.map((item, index) => (
            <ItemComponent item={item} index={index} />
          ))}
          {/* <SortableList items={addedItems} /> */}

          <button
            className="btn btn-outline btn-success mt-5"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksList;
