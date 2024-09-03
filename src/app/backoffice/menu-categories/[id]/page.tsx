"use client";

import { config } from "@/config";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from "@mui/material";
import { MenuCategories } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props{
  params: {
    id: string
  }
}
export default function MenuUpdatePage({params}: Props) {
  const [menuCategory, setMenuCategory] = useState<MenuCategories>();
  const router = useRouter();
  const {id} = params;
  // console.log("frontend id is", id);

  useEffect(() => {
    if (id) {
      getMenu();
    }
  }, [id]);

  const getMenu = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menu-categories/${id}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    const dataFromServer = await response.json();
    const { menuCategory } = dataFromServer;
    setMenuCategory(menuCategory);
  };

  const handleUpdateMenuCategory = async () => {
    await fetch(`${config.backofficeApiUrl}/menu-categories`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(menuCategory),
    });
    router.push("/backoffice/menu-categories");
  };

  const handleDeleteMenuCategory = async ()=>{
    await fetch(`${config.backofficeApiUrl}/menu-categories/${id}`,{
      method:"DELETE",
      headers: {"content-type": "application/json"}
    });
   
    router.push("/backoffice/menu-categories");
  }

  if (!menuCategory) return null;
  return (
    // console.log("hello update page")
    <>
      <h3>Update Menu</h3>
      <Box sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          value={menuCategory.name}
          variant="outlined"
          onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></TextField>
        <FormControlLabel
          control={<Checkbox checked={menuCategory.isAvailable ? true : false} />}
          label="Available"
          onChange={(evt, value) => setMenuCategory({ ...menuCategory, isAvailable: value })}
        />
        
        
        <Box>
        
        <Button
          sx={{ width: "fit-content", color: "red", borderColor: "red" }}
          variant="outlined"
          onClick={handleDeleteMenuCategory}
        >
          Delete
        </Button>
        <Button
          sx={{ m: 2, width: "fit-content" }}
          variant="contained"
          onClick={handleUpdateMenuCategory}
        >
          Update
        </Button>
        </Box>
      </Box>
    </>
  );
}
