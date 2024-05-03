import { FaPlus } from "react-icons/fa";

const AddTask = () => {
  return (
    <div>
      <button className="btn btn-primary w-full">
        Add New Task <FaPlus size={20} />
      </button>
    </div>
  );
};

export default AddTask;
