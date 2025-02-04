import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Prayer({name,time,imge}) {
    return (
        <Card className='card'>
        <CardMedia
            sx={{ height: 140 }}
            image={imge}
            title="green iguana"
        />
        <CardContent>
            <h3 >
            {name}
            </h3>
            <Typography variant="h1" sx={{ color: 'text.secondary' }}>
            {time}
            </Typography>
        </CardContent>
        </Card>
    );
}