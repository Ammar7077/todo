"use client";
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { MdAdd, MdClose, MdRemove } from "react-icons/md";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  ModalClose,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import { TaskType } from "@/types/tasks-type";
import AddTaskForm from "./AddTaskForm";

export default function AddTaskModal({ task }: { task?: TaskType }) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button endDecorator={<MdAdd />} onClick={() => setOpen(true)}>
        Task
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog size="lg" sx={{ width: "70%", overflow: "auto" }}>
          <ModalClose />
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
          <AddTaskForm task={task} setOpen={setOpen} />
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
