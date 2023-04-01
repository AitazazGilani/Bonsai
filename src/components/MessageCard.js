import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Favorite, Reply } from '@mui/icons-material';
import { useState } from 'react';

function MessageCard(props) {
  const { title, message } = props;
  const [likes, setLikes] = useState(0);
  const [replies, setReplies] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleReply = () => {
    setReplies(replies + 1);
  };

  return (
    <Card sx={{ bgcolor: '#D8F3DC', marginBottom: '20px' }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ color: '#081C15' }}>
          {title}
        </Typography>
        <Typography color="textSecondary" sx={{ color: '#081C15' }}>
          {message}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like" onClick={handleLike}>
          <Badge badgeContent={likes} color="primary">
            <Favorite />
          </Badge>
        </IconButton>
        <IconButton aria-label="reply" onClick={handleReply}>
          <Badge badgeContent={replies} color="primary">
            <Reply />
          </Badge>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MessageCard;