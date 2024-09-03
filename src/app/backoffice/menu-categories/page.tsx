"use client"

import MenuCategoryCard from "@/components/MenuCategoryCard";
import { config } from "@/config";
import { Box, Button } from "@mui/material";
import { MenuCategories } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuCategoriesPage() {
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const router = useRouter();

  useEffect(()=>{
    getMenuCategories();
},[])

const getMenuCategories = async () => {
  const response = await fetch(`${config.backofficeApiUrl}/menu-categories`);
  const dataFromServer = await response.json();
  console.log(dataFromServer);
  const { menuCategories } = dataFromServer;
  setMenuCategories(menuCategories);
};

  

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Menu Categories Page</h1>
        <Button
        variant="contained"
        sx={{
          bgcolor: "#1D3557",
          "&:hover": { bgcolor: "#2d4466" },
        }}
          
          onClick={() => router.push("/backoffice/menu-categories/new")}
        >
          New Menu Category
        </Button>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap",
          }}>
        {menuCategories.map((menuCategory)=> (
        <Link style={{textDecoration: "none"}} href={`/backoffice/menu-categories/${menuCategory.id}`}>
          <MenuCategoryCard title={menuCategory.name} isAvailable = {menuCategory.isAvailable} ></MenuCategoryCard>
        </Link>
        
        )

        )}
      </Box>
    </>
  );
}
