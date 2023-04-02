import { Card, CardContent, Typography } from '@mui/material';
import { Favorite, Reply } from '@mui/icons-material';

const MessageDetails = ({ message }) => {
  return (
    <Card sx={{ minWidth: 275, bgcolor: '#D8F3DC' }}>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ color: '#081C15' }}>
          {message.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {message.content}
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.secondary">
          <Favorite sx={{ mr: 1 }} /> {message.likes}
          <Reply sx={{ ml: 2, mr: 1 }} /> {message.replies}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MessageDetails;