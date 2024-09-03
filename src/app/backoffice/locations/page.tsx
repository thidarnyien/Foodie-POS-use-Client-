"use client"

import LocationCard from "@/components/LocationCard"
import { config } from "@/config"
import CloseIcon from "@mui/icons-material/Close"
import { Box, Button, IconButton } from "@mui/material"
import { Locations } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function LocationsPage(){
    const [locations, setLocations] = useState<Locations[]>([]);
    const router = useRouter();

    useEffect(()=>{
      getLocations()
    },[])

    const getLocations = async () =>{
      const response = await fetch(`${config.backofficeApiUrl}/locations`);
      const dataFromServer = await response.json();
      const {locations} = dataFromServer;
      setLocations(locations);
    }

    const handleDeleteLocation= async(location : Locations)=>{
      await fetch(`${config.backofficeApiUrl}/locations/${location.id}`, {
        method: "DELETE",
        headers: {"content-type": "application/json"}
      });
      getLocations();
      router.push("/backoffice/locations");
    }

    return(
      <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Locations Page</h1>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1D3557",
            "&:hover": { bgcolor: "#2d4466" },
          }}
          onClick={() => router.push("/backoffice/locations/new")}
        >
          New Location
        </Button>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
        {locations.map((location) => (
          <div
            key={Number(location.id)}
            style={{ position: "relative", width: "fit-content", marginRight: "20px" }}
          >
            <Link
              href={`/backoffice/locations/${location.id}`}
              style={{ textDecoration: "none"}}
            >
              <LocationCard location={location}/>
            </Link>
            <IconButton
              aria-label="Close"
              sx={{
                position: "absolute",
                top: 8,
                right: 15,
                borderRadius: "50%",
                backgroundColor: "lightgray",
                color: "dark",
              }}
              size="small"
              onClick={()=> handleDeleteLocation(location)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </Box>
    </>
      )
}