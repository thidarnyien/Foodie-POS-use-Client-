"use client";
// import { BackofficeLayout } from "@/components/BackofficeLayout";
import { config } from "@/config";
import {
  Box,
  Button,
  TextField
} from "@mui/material";
import { Companies } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCompanyPage() {
  const [newCompany, setNewCompany] = useState<Companies>({
    id: 1,
    name: "",
    phoneNumber: "",
    address : ""
  });
  const router = useRouter();


  const handleCreateCompany = async () => {
    const isValid = newCompany.name;
    if (!isValid) return alert("Required company name and address!");
    await fetch(`${config.backofficeApiUrl}/companies`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...newCompany }),
    });
    router.push("/backoffice/companies");
  };
  return (
    <>
      <h3>New Company</h3>
      <Box sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Name"
          label="Name"
          variant="outlined"
          onChange={(evt) => setNewCompany({ ...newCompany, name: evt.target.value })}
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Phone Number"
          label="Phone Number"
          variant="outlined"
          onChange={(evt) =>
            setNewCompany({ ...newCompany, phoneNumber: evt.target.value })
          }
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Address"
          label="Address"
          variant="outlined"
          onChange={(evt) =>
            setNewCompany({ ...newCompany, address: evt.target.value})
          }
        ></TextField>
        
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
          onClick={handleCreateCompany}
        >
          Create
        </Button>
      </Box>
    </>
  );
}
