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
import { useEffect, useState } from "react";

interface Props{
  params : {
    id: string
  }
}

export default function UpdateCompanyPage({params}:Props) {
  const [company, setCompany] = useState<Companies>();
  const router = useRouter();
  const {id} = params;

  useEffect(()=>{
    if(id) getCompany();
  },[id])

  const getCompany = async ( ) => {
    const response = await fetch(`${config.backofficeApiUrl}/companies/${id}`,{
      method: "GET",
      headers: {"content-type": "application/json"}
    });
    const dataFromServer = await response.json();
    const {company } =await dataFromServer;
    setCompany(company);  
  }

  const handleUpdateCompany = async () => {
    // const isValid = company?.name;
    // if (!isValid) return alert("Required company name and address!");
    await fetch(`${config.backofficeApiUrl}/companies`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...company }),
    });
    router.push("/backoffice/companies");
  };
  if(!company) return null;
  return (
    <>
      <h3>Update Company</h3>
      <Box sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          // placeholder="Name"
          label="Name"
          value = {company.name}
          variant="outlined"
          onChange={(evt) => setCompany({ ...company, name: evt.target.value })}
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          // placeholder="Phone Number"
          value = {company.phoneNumber}
          label="Phone Number"
          variant="outlined"
          onChange={(evt) =>
            setCompany({ ...company, phoneNumber: evt.target.value })
          }
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          // placeholder="Address"
          value = {company.address}
          label="Address"
          variant="outlined"
          onChange={(evt) =>
            setCompany({ ...company, address: evt.target.value})
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
          onClick={handleUpdateCompany}
        >
          Update
        </Button>
      </Box>
    </>
  );
}
