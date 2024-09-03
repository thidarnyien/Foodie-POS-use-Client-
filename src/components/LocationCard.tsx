import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Locations } from '@prisma/client';

interface Props{
    location: Locations
}

export default function LocationCard({location}: Props) {
    const {name, address , phoneNumber} = location;
  return (
    <Card sx={{ width: 280}}>
      <CardMedia
        component="img"
        height="180"
        image="https://img.freepik.com/premium-photo/table-with-plates-food-cups-coffee-cup-coffee_1316263-69012.jpg?uid=R76101435&ga=GA1.1.1237740603.1724599949&semt=ais_hybrid"
        alt="Shop Branch"
        sx={{ borderRadius: '4px 4px 0 0', objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 3, '& > :not(style) ~ :not(style)': { mt: 2 } }}>
        <Typography sx={{my:0}} variant="h6" component="div">
            {name}
        </Typography>
        <Typography sx={{my: 0}} variant="body2" color="text.secondary">
          {address}
        </Typography>
        <Typography sx={{my: 0, color: "black"}} variant="body2" color="text.secondary">
          {phoneNumber}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          rel="noopener noreferrer"
          fullWidth
        >
          See Details
        </Button>
      </CardContent>
    </Card>
  );
}
