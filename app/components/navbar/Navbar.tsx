"use client";
import Box from "@mui/joy/Box";
import React, { useEffect } from "react";
import ColorToggle from "../color-toggle/ColorToggle";
import { Button, Container, Sheet, styled } from "@mui/joy";
import Link from "next/link";
import LoginModal from "../login-modal/LoginModal";
import RegisterModal from "../register-modal/RegisterModal";
import { useRecoilState } from "recoil";
import User from "@/atoms/user";

const Header = styled(Sheet)(({ theme }) => ({
  gap: 1,
  border: "none",
  display: "flex",
  flexDirection: "row",
  background: theme.vars.palette.background.level1,
  padding: 15,
  justifyContent: "space-between",
  alignItems: "center",
  gridColumn: "1 / -1",
  position: "fixed",
  top: 0,
  left: 0,
  overflow: "hidden",
  zIndex: 1100,
  width: "100%",
}));

function Navbar() {
  const [user] = useRecoilState(User);

  return (
    <>
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Header className="Header" sx={{ px: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Link href="/">TODO APP</Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user ? (
              <>
                <span>{user.username}</span>
              </>
            ) : (
              <>
                <RegisterModal />
                <LoginModal />
              </>
            )}

            <ColorToggle />
          </Box>
        </Header>
      </Container>
    </>
  );
}

export default Navbar;
