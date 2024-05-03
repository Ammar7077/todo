import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemDecorator,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  Input,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/joy";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import { baseUrl } from "@/settings";
import { useRecoilState } from "recoil";
import Tasks from "@/atoms/tasks";
import User from "@/atoms/user";
import { RxStarFilled } from "react-icons/rx";

function Task({ task }: any) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [todoItemId, setTodoItemId] = useState("false");
  const [itemId, setItemId] = useState("");
  const [todoId, setTodoId] = useState("");
  const [tasks, setTasks] = useRecoilState(Tasks);
  const [user, setUser] = useRecoilState(User);
  const token = localStorage.getItem("accessToken");
  const [isChecked, setIsChecked] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    item_priority: "normal",
    item_due_date: Date.now(),
  });

  const handleCancel = () => {
    setOpen(false);
    setNewItem({
      name: "",
      item_priority: "normal",
      description: "",
      item_due_date: Date.now(),
    });
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
    setNewItem({
      name: "",
      item_priority: "normal",
      description: "",
      item_due_date: Date.now(),
    });
  };

  const handleSaveItem = async () => {
    if (!user) {
      return alert("You must be logged in");
    }
    if (!token) {
      return alert("Token is required");
    }

    try {
      await axios
        .post(`${baseUrl}/users/todos/${todoId}?userId=${user._id}`, newItem, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: any) => {
          setTasks(response.data.user.tasks);
          alert("Task item added successfully.");
          console.log(response);
          setNewItem({
            name: "",
            item_priority: "normal",
            description: "",
            item_due_date: Date.now(),
          });
        })
        .catch((err: any) => console.log(err.message));
    } catch (error: any) {
      console.log(error.message);
    }
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  const handleAddItem = (item: any, id: string) => {
    setNewItem({
      name: item.name,
      description: item.description,
      item_priority: item.item_priority,
      item_due_date: Date.now(),
    });
    setOpenEdit(true);
    setTodoItemId(id);
    setItemId(item._id);
  };

  const openAddModal = (id: string) => {
    setOpen(true);
    setTodoId(id);
  };

  const handleEdit = async () => {
    if (!user) {
      return alert("Please login");
    }

    if (!token) {
      return alert("Token is required");
    }

    try {
      await axios
        .put(
          `${baseUrl}/users/todoItem/${todoItemId}?userId=${user._id}&itemId=${itemId}`,
          newItem,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTasks(res.data.tasks);
          alert(res.data.message);
          setOpenEdit(false);
        })
        .catch((err) => console.log(err));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCheckboxClick = async (itemId: string, taskId: string) => {
    try {
      setIsChecked(!isChecked);

      await axios
        .put(
          `${baseUrl}/users/todoItem/${taskId}?userId=${user?._id}&itemId=${itemId}`,
          {
            is_checked: !isChecked,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => setTasks(res.data.tasks))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios
        .delete(`${baseUrl}/users/todos/${id}?userId=${user?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const newTasks = tasks.filter((t: any) => t._id !== id);
          setTasks(newTasks);
        })
        .catch((err) => console.log(err));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleShare = (id: string) => {
    console.log({ id });
  };

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CardContent>
          <Typography level="title-lg" sx={{ pb: 2 }}>
            {task.name}
          </Typography>
          <Typography level="body-sm">{task.description}</Typography>
        </CardContent>

        <IconButton
          onClick={() => handleShare(task._id)}
          color="primary"
          variant="soft"
        >
          <RxStarFilled />
        </IconButton>
        <IconButton color="primary" variant="soft">
          <MdEdit />
        </IconButton>
        <IconButton
          onClick={() => handleDeleteTodo(task._id)}
          color="danger"
          variant="solid"
        >
          <MdDelete />
        </IconButton>
        <Button onClick={() => openAddModal(task._id)} color="success">
          Add Item
        </Button>
      </Box>

      <List>
        {(task.items ?? []).map((item: any) => (
          <ListItem key={item.id}>
            <ListItemDecorator
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  // level="title-sm"
                  sx={{
                    display: "flex",
                    paddingRight: "10px",
                    fontSize: "12px",
                  }}
                >
                  {item.item_priority}
                </Typography>
                <Checkbox
                  checked={item.is_checked}
                  onClick={() => handleCheckboxClick(item._id, task._id)}
                  sx={{ pr: 2 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                  }}
                >
                  <Typography level="title-lg">{item.name}</Typography>
                  <Typography level="title-sm">{item.description}</Typography>
                </Box>
              </Box>
              <Button
                sx={{ width: "80px" }}
                onClick={() => handleAddItem(item, task._id)}
              >
                Edit
              </Button>
            </ListItemDecorator>
          </ListItem>
        ))}
      </List>

      <Modal open={open} onClose={handleCancel}>
        <ModalDialog>
          <ModalClose onClick={handleCancel} />
          <Typography level="title-lg">New Item</Typography>
          <FormControl sx={{ mt: 2 }} required>
            <FormLabel>Name</FormLabel>
            <Input
              value={newItem.name}
              onChange={handleChange}
              placeholder="Enter item name"
              name="name"
              autoFocus
            />
          </FormControl>
          <FormControl sx={{ mt: 2 }} required>
            <FormLabel>Description</FormLabel>
            <Input
              value={newItem.description}
                onChange={handleChange}
                placeholder="Enter item description"
                name="description"
              />
            </FormControl>
            <FormControl sx={{ mt: 2 }} required>
              <FormLabel>Priority</FormLabel>
              <select
                value={newItem.item_priority}
                onChange={handleChange}
                name="item_priority"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </FormControl>
  
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleCancel} variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button onClick={handleSaveItem} color="primary">
                Save
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
  
        <Modal open={openEdit} onClose={handleCancelEdit}>
          <ModalDialog>
            <ModalClose onClick={handleCancelEdit} />
            <Typography level="title-lg">Update Item</Typography>
            <FormControl sx={{ mt: 2 }} required>
              <FormLabel>Name</FormLabel>
              <Input
                value={newItem.name}
                onChange={handleChange}
                placeholder="Enter item name"
                name="name"
                autoFocus
              />
            </FormControl>
            <FormControl sx={{ mt: 2 }} required>
              <FormLabel>Description</FormLabel>
              <Input
                value={newItem.description}
                onChange={handleChange}
                placeholder="Enter item description"
                name="description"
              />
            </FormControl>
            <FormControl sx={{ mt: 2 }} required>
              <FormLabel>Priority</FormLabel>
              <select
                value={newItem.item_priority}
                onChange={handleChange}
                name="item_priority"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </FormControl>
            <FormControl sx={{ mt: 2 }} required>
              <FormLabel>Time</FormLabel>
              <Input
                value={newItem.item_due_date}
                onChange={handleChange}
                placeholder="Enter item item_due_date"
                name="item_due_date"
                type="date"
              />
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                onClick={handleCancelEdit}
                variant="outlined"
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button onClick={handleEdit} color="primary">
                Save
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
      </Card>
    );
  }
  
  export default Task;
  