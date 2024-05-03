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
import axios from "axios";
import { baseUrl } from "@/settings";
import { useRecoilState } from "recoil";
import User from "@/atoms/user";

export default function RegisterModal() {
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [user, setUser] = useRecoilState(User);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await axios
        .post(`${baseUrl}/auth/register`, data)
        .then((response) => {
          setOpen(false);
          setData({
            username: "",
            email: "",
            password: "",
          });
          localStorage.setItem("accessToken", response.data.accessToken);
          setUser(response.data.newUser);
        })
        .catch((reserror) => setError(reserror.response.data.error));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Register
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>New!</DialogTitle>
          <DialogContent>Please Create Account.</DialogContent>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form>
            <Stack spacing={2} component="form">
              <FormControl required>
                <FormLabel>User Name</FormLabel>
                <Input
                  value={data.username}
                  onChange={onChange}
                  type="text"
                  placeholder="User Name"
                  name="username"
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Last Name</FormLabel>
              </FormControl>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input
                  value={data.email}
                  onChange={onChange}
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input
                  value={data.password}
                  onChange={onChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </FormControl>
              <Button type="button" onClick={(e) => { e.preventDefault(); onSubmit(); }}>
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
