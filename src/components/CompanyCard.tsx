import ApartmentIcon from '@mui/icons-material/Apartment';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Companies } from '@prisma/client';
interface Props{
    company : Companies
}

export default function CompanyCard({company} : Props) {
  return (
    <Card sx={{ width: "280px", height:"200px", p: 3, display: 'grid', gap: 2 }}>
      <CardHeader sx={{p: 1}}
         avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
           <ApartmentIcon></ApartmentIcon>
          </Avatar>
        }
        title={
          <Typography variant="h6" component="div">
            {company.name}
          </Typography>
        }
      />
      <CardContent sx={{ py: 0}}>
        <Box sx={{ display: 'grid', gap: 1, color: 'text.secondary' }}>
          <Typography variant="body2">
            <strong>Address:</strong> {company.address}
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> (555) {company.phoneNumber}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
