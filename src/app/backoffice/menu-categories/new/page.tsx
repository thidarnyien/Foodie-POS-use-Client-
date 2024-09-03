"use client";
import { config } from "@/config";
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { MenuCategories } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewMenuCategoryPage() {
  const defaultMenuCategory = { name: "" };
  const [newMenuCategory, setNewMenuCategory] =
    useState<Partial<MenuCategories>>(defaultMenuCategory);
  const router = useRouter();

  const handleCreateMenuCategory = async () => {
    const isValid = newMenuCategory.name;
    console.log(newMenuCategory);
    if (!isValid) return alert("Required new menu category name!");
    await fetch(`${config.backofficeApiUrl}/menu-categories`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newMenuCategory),
    });
    router.push("/backoffice/menu-categories");
  };

  return (
    <>
      <h3>New Menu Category</h3>
      <Box sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Name"
          label="Name"
          variant="outlined"
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        ></TextField>
      <FormControlLabel
          control={<Checkbox checked={newMenuCategory.isAvailable ? true : false} />}
          label="Available"
          onChange={(evt, value) => setNewMenuCategory({ ...newMenuCategory, isAvailable: value })}
        />
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          onClick={handleCreateMenuCategory}
        >
          Create
        </Button>
      </Box>
    </>
  );
}
