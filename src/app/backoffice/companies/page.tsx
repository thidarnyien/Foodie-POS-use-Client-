"use client"

import CompanyCard from "@/components/CompanyCard"
import { config } from "@/config"
import CloseIcon from "@mui/icons-material/Close"
import { Box, Button, IconButton } from "@mui/material"
import { Companies } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function CompaniesPage(){
    const [companies, setCompanies] = useState<Companies[]>([]);
    const router = useRouter();

    useEffect(()=>{
      getCompanies()
    },[])

    const getCompanies = async () =>{
      const response = await fetch(`${config.backofficeApiUrl}/companies`);
      const dataFromServer = await response.json();
      const {companies} = dataFromServer;
      setCompanies(companies);
    }

    const handleDeleteCompany= async(company : Companies)=>{
      await fetch(`${config.backofficeApiUrl}/companies/${company.id}`, {
        method: "DELETE",
        headers: {"content-type": "application/json"}
      });
      getCompanies();
      router.push("/backoffice/companies");
    }

    return(
      <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Companies Page</h1>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1D3557",
            "&:hover": { bgcolor: "#2d4466" },
          }}
          onClick={() => router.push("/backoffice/companies/new")}
        >
          New Company
        </Button>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
        {companies.map((company) => (
          <div
            key={Number(company.id)}
            style={{ position: "relative", width: "fit-content", marginRight: "20px",marginBottom: "20px"  }}
          >
            <Link
              href={`/backoffice/companies/${company.id}`}
              style={{ textDecoration: "none"}}
            >
              <CompanyCard company={company}/>
            </Link>
            <IconButton
              aria-label="Close"
              sx={{
                position: "absolute",
                top: 8,
                right: 15,
                borderRadius: "50%",
                backgroundColor: "whitesmoke",
                color: "dark",
              }}
              size="small"
              onClick={()=> handleDeleteCompany(company)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </Box>
    </>
      )
}