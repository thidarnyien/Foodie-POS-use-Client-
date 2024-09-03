"use client";
import { MenuCard } from "@/components/MenuCard";
import { config } from "@/config";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton } from "@mui/material";
import { Menus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenusPage() {
  const [menus, setMenus] = useState<Menus[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menus`);
    const dataFromServer = await response.json();
    const {menus} = dataFromServer;
    console.log(menus);
    setMenus(menus);
  };

  const handleDeleteMenu = async (menu: Menus) => {
    await fetch(`${config.backofficeApiUrl}/menus/${menu.id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    getMenus();
    router.push("/backoffice/menus");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Menus Page</h1>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1D3557",
            "&:hover": { bgcolor: "#2d4466" },
          }}
          onClick={() => router.push("/backoffice/menus/new")}
        >
          New menu
        </Button>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
        {menus.map((menu) => (
          <div
            key={Number(menu.id)}
            style={{ position: "relative", width: "fit-content" }}
          >
            <Link
              href={`/backoffice/menus/${menu.id}`}
              style={{ textDecoration: "none" }}
            >
              <MenuCard menu={menu} />
            </Link>
            <IconButton
              aria-label="Close"
              sx={{
                position: "absolute",
                top: 8,
                right: 33,
                borderRadius: "50%",
                backgroundColor: "lightgray",
                color: "dark",
              }}
              size="small"
              onClick={() => handleDeleteMenu(menu)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </Box>
    </>
  );
}
