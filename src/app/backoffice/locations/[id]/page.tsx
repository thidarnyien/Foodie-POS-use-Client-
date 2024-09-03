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
import { useEffect, useState } from "react";

interface Props{
  params : {
    id: string
  }
}

export default function UpdateLocationPage({params}:Props) {
  const [location, setLocation] = useState<Locations>({
    id: 1,
    name: "",
    phoneNumber: "",
    address : "",
    companyId: 1,
  });
  const router = useRouter();
  const {id} = params;

  useEffect(()=>{
    getLocation();
  },[])

  const getLocation = async ( ) => {
    const response = await fetch(`${config.backofficeApiUrl}/locations/${id}`);
    const dataFromServer = await response.json()
    const {location } =await dataFromServer;
    setLocation(location);  
  }

  const handleUpdateLocation = async () => {
    const isValid = location.name;
    if (!isValid) return alert("Required location name and address!");
    await fetch(`${config.backofficeApiUrl}/locations`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...location }),
    });
    router.push("/backoffice/locations");
  };
  return (
    <>
      <h3>Update Location</h3>
      <Box sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          // placeholder="Name"
          label="Name"
          value = {location.name}
          variant="outlined"
          onChange={(evt) => setLocation({ ...location, name: evt.target.value })}
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          // placeholder="Phone Number"
          value = {location.phoneNumber}
          label="Phone Number"
          variant="outlined"
          onChange={(evt) =>
            setLocation({ ...location, phoneNumber: evt.target.value })
          }
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          // placeholder="Address"
          value = {location.address}
          label="Address"
          variant="outlined"
          onChange={(evt) =>
            setLocation({ ...location, address: evt.target.value})
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
          onClick={handleUpdateLocation}
        >
          Update
        </Button>
      </Box>
    </>
  );
}
