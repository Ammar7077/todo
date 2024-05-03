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
import { getWhere, usersEndPoint } from "@/apis/apis";
import { baseUrl } from "@/settings";
import axios from "axios";
import User from "@/atoms/user";
import { useRecoilState } from "recoil";

export default function LoginModal() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [user, setUser] = useRecoilState(User);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(`${baseUrl}/auth/login`, data)
        .then((response) => {
          setOpen(false);
          setData({
            email: "",
            password: "",
          });
          localStorage.setItem("accessToken", response.data.accessToken);
          setUser(response.data.user);
        })
        .catch((reserror) => setError(reserror.response.data.error));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="solid" color="primary" onClick={() => setOpen(true)}>
        Login
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Welcome Back!</DialogTitle>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <DialogContent>Please Login.</DialogContent>
          <form>
            <Stack spacing={2} component="form">
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
              <Button onClick={onSubmit}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
