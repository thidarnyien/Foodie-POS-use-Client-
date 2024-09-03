"use client"
import MultiSelect from "@/components/MultiSelect";
import { config } from "@/config";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { MenuCategories, MenuCategoriesMenus, Menus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props{
  params: {
    id: string
  }
}

export default function MenuUpdatePage({params}: Props) {
  const [menu, setMenu] = useState<Menus>();
  const [selected, setSelected] = useState<number[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const router = useRouter();
  const {id} = params;
  // console.log("frontend id is", id);

  useEffect(() => {
    if (id) {
      getMenu();
      getMenuCategories();
    }
  }, [id]);

  const getMenu = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menus/${id}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    const dataFromServer = await response.json();
    const { menu } = dataFromServer;
    // console.log(menu);
    const menuCategoryIds = menu.menuCategoriesMenus.map((item: MenuCategoriesMenus) => item.menuCategoryId);
    // console.log(menuCategoryIds);
    setSelected(menuCategoryIds);
    setMenu(menu);
    // console.log("menu : " , menu ,"Menu Category Id : ", menuCategoryId);
  };

  const getMenuCategories = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menu-categories`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
    // console.log("menu : " , menu ,"Menu Category Id : ", menuCategories);
  };

  const handleUpdateMenu = async () => {
    await fetch(`${config.backofficeApiUrl}/menus`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({...menu, menuCategoryIds : selected}),
    });
    router.push("/backoffice/menus");
  };
  if (!menu) return null;
  return (
    // console.log("hello update page")
    <>
      <h3>Update Menu</h3>
      <Box sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          value={menu.name}
          variant="outlined"
          onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="number"
          value={menu.price}
          variant="outlined"
          onChange={(evt) =>
            setMenu({ ...menu, price: Number(evt.target.value) })
          }
        ></TextField>
        <MultiSelect title="Menu Category" selected={selected} setSelected={setSelected} items={menuCategories}></MultiSelect>
        <FormControlLabel
          control={<Checkbox checked={menu.isAvailable ? true : false} />}
          label="Available"
          onChange={(evt, value) => setMenu({ ...menu, isAvailable: value })}
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              value={menu.isAvailable}
              onChange={(_evt, value) =>
                setMenu({ ...menu, isAvailable: value? true : false })
              }
            />
          }
          label="Avaiable"
        /> */}
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          onClick={handleUpdateMenu}
        >
          Update
        </Button>
      </Box>
    </>
  );
}
