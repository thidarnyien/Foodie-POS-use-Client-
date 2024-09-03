"use client";
// import { BackofficeLayout } from "@/components/BackofficeLayout";
import { config } from "@/config";
import {
    Box,
    Button,
    TextField
} from "@mui/material";
import { Locations } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewLocationPage() {
  const [newLocation, setNewLocation] = useState<Locations>({
    id: 1,
    name: "",
    phoneNumber: "",
    address : "",
    companyId: 1,
  });
  const router = useRouter();


  const handleCreateLocation = async () => {
    const isValid = newLocation.name;
    if (!isValid) return alert("Required location name and address!");
    await fetch(`${config.backofficeApiUrl}/locations`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...newLocation }),
    });
    router.push("/backoffice/locations");
  };
  return (
    <>
      <h3>New Location</h3>
      <Box sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Name"
          label="Name"
          variant="outlined"
          onChange={(evt) => setNewLocation({ ...newLocation, name: evt.target.value })}
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Phone Number"
          label="Phone Number"
          variant="outlined"
          onChange={(evt) =>
            setNewLocation({ ...newLocation, phoneNumber: evt.target.value })
          }
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Address"
          label="Address"
          variant="outlined"
          onChange={(evt) =>
            setNewLocation({ ...newLocation, address: evt.target.value})
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
          onClick={handleCreateLocation}
        >
          Create
        </Button>
      </Box>
    </>
  );
}
