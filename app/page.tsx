"use client";
import User from "@/atoms/user";
import { baseUrl } from "@/settings";
import getUserData from "@/utils/auth";
import { Box, Container, Typography } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Task from "./components/task/Task";
import AddTaskModal from "./components/task/add-task/AddTaskModal";
import Tasks from "@/atoms/tasks";

export default function Home() {
  const [tasks, setTasks] = useRecoilState(Tasks);
  const [user, setUser] = useRecoilState(User);
  let token: string = "";
  if (typeof localStorage !== "undefined") {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken !== null) {
      token = storedToken;
    }
  }

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const getUser = async () => {
        if (token) {
          const userData = await getUserData(token);
          setUser(userData);
          return userData;
        }
      };
      getUser();
    }
  }, []);

  const getTasks = async () => {
    if (user?._id) {
      try {
        const response = await axios.get(
          `${baseUrl}/users/todos/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getTasks();
  }, [user]);

  return (
    <Container>
      <Box
        sx={{ pt: 15, pb: 3, display: "flex", justifyContent: "space-between" }}
      >
        <Typography level="h3">Add Task</Typography>
        <AddTaskModal />
      </Box>
      <Box
        sx={{ pt: 10, pb: 2, display: "flex", justifyContent: "space-between" }}
      ></Box>
      {!tasks.length ? (
        <>You are not logged in</>
      ) : (
        tasks?.map((task: any) => <Task task={task} key={task.id} />)
      )}
      <Box sx={{ pt: 10 }} />
    </Container>
  );
}
