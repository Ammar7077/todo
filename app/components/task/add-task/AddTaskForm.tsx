"use client";
import Tasks from "@/atoms/tasks";
import User from "@/atoms/user";
import { baseUrl } from "@/settings";
import { TaskType } from "@/types/tasks-type";
import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";

export default function AddTaskForm({ task, setOpen }: any) {
  const [user, setUser] = useRecoilState(User);
  const token = localStorage.getItem("accessToken");
  const [tasks, setTasks] = useRecoilState(Tasks);
  const [data, setData] = React.useState({
    name: "",
    description: "",
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      return alert("Please log in");
    }

    try {
      const response = await axios.post(
        `${baseUrl}/users/todos/user/${user._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.user.tasks);

      setData({
        name: "",
        description: "",
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <Stack spacing={2}>
        <FormControl required>
          <FormLabel>Task Name</FormLabel>
          <Input
            value={data.name}
            onChange={onChange}
            type="text"
            placeholder={task ? task.name : "Task Name"}
            name="name"
            autoFocus
            required
          />
        </FormControl>
        <FormControl required>
          <FormLabel>Task Description</FormLabel>
          <Input
            value={data.description}
            onChange={onChange}
            name="description"
            type="text"
            placeholder={task ? task.description : "Description"}
            required
          />
        </FormControl>
        <Button onClick={onSubmit}>Submit</Button>
      </Stack>
    </form>
  );
}
