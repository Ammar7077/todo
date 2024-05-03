import { ItemType } from "@/types/items-type";
import { IoMdInformationCircleOutline } from "react-icons/io";
import IconButton from "./IconButton";
import TextField from "./TextField";
import { useState } from "react";

interface ItemProps {
  index: number;
  item: ItemType;
  // onChange: (value: string) => void;
}

const ItemComponent: React.FC<ItemProps> = ({ index, item }) => {
  const [isCheck, setIsCheck] = useState(item.is_checked);

  function handleCheckboxChange() {
    setIsCheck((prev) => !prev);
  }

  return (
    <>
      <div
        key={index}
        className="p-2"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <input
          type="checkbox"
          className="checkbox mt-2"
          checked={isCheck}
          onChange={handleCheckboxChange}
        />
        <div style={{ width: "1rem" }} />
        <TextField defaultValue={item.name} />
        <div style={{ flexGrow: 99999 }} />
        <dialog id={`modal_${index}`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <TextField defaultValue={item.description} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <IconButton
          icon={<IoMdInformationCircleOutline className="ml-5" size={25} />}
          onTap={() => {
            document.getElementById(`modal_${index}`)!.showModal();
          }}
        />
      </div>
    </>
  );
};

export default ItemComponent;
