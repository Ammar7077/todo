import IconButton from "./IconButton";
import { IoIosShareAlt } from "react-icons/io";
import { useState } from "react";
import { patch, tasksEndPoint } from "@/apis/apis";

type ShareButtonProps = {
  status: boolean;
  id: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ status, id }) => {
  const [newStatus, setNewStatus] = useState(status);

  function handleChange() {
    setNewStatus((prev) => {
      patch(tasksEndPoint, id, { is_shared: !prev });
      return !prev;
    });
  }

  return (
    <IconButton
      icon={
        <IoIosShareAlt
          className="ml-5 mr-2"
          size={26}
          color={newStatus ? "yellow" : "white"}
        />
      }
      onTap={handleChange}
    />
  );
};
export default ShareButton;
