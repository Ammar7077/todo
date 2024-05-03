import { Typography } from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ href, name }: { href: string; name: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} replace={true}>
      <Typography
        level="title-md"
        borderRadius="sm"
        sx={{
          position: "relative",
          color: isActive ? "neutral.solidBg" : "#fff",
          fontWeight: "bold",

          fontSize: "lg",
          ":hover": {
            ":after": {
              width: "100%",
              right: 0,
              left: "unset",
            },
          },
          ":after": {
            content: "''",
            width: isActive ? "100%" : "0",
            height: "1.5px",
            display: "block",
            background: "linear-gradient(180deg,  #0E6B81, #FAAF40)",
            transition: "all 0.3s linear",
            position: "absolute",
            bottom: "-4px",

            left: 0,
            right: "unset",
          },
        }}
      >
        {name}
      </Typography>
    </Link>
  );
};

export default ActiveLink;
