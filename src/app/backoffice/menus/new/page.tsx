"use client";
// import { BackofficeLayout } from "@/components/BackofficeLayout";
import MultiSelect from "@/components/MultiSelect";
import { config } from "@/config";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { MenuCategories, Menus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewMenuPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const [newMenu, setNewMenu] = useState<Menus>({
    id: 1,
    name: "",
    price: 0,
    isAvailable: false,
  });
  const router = useRouter();

  useEffect(() => {
    getMenuCategories();
  }, []);

  const getMenuCategories = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menu-categories`);
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
  };

  const handleCreateMenu = async () => {
    const isValid = newMenu.name && selected;
    if (!isValid) return alert("Required menu name and menu category!");
    await fetch(`${config.backofficeApiUrl}/menus`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...newMenu, menuCategoryIds: selected }),
    });
    router.push("/backoffice/menus");
  };
  return (
    <>
      <h3>New Menu</h3>
      <Box sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Name"
          label="Name"
          variant="outlined"
          onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="number"
          placeholder="Price"
          label="Price"
          variant="outlined"
          onChange={(evt) =>
            setNewMenu({ ...newMenu, price: Number(evt.target.value) })
          }
        ></TextField>
        <MultiSelect
          title="Menu Category"
          selected={selected}
          setSelected={setSelected}
          items={menuCategories}
        ></MultiSelect>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Available"
          onChange={(evt, value) =>
            setNewMenu({ ...newMenu, isAvailable: value })
          }
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              onChange={(evt, value) =>
                setNewMenu({ ...newMenu, isAvailable: value ? true : false })
              }
            />
          }
          label="Avaiable"
        /> */}
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          onClick={handleCreateMenu}
        >
          Create
        </Button>
      </Box>
    </>
  );
}
