"use client";
import ThemeRegistry from "@/ThemeRegistry/ThemeRegistry";
import { RecoilRoot } from "recoil";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRoot>
      <ThemeRegistry>
        <html lang="en">
          <body>
            <Navbar />
            {children}
            {/* <Footer /> */}
          </body>
        </html>
      </ThemeRegistry>
    </RecoilRoot>
  );
}
