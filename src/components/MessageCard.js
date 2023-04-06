import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Favorite, Reply, HeartBroken } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';

function MessageCard(props) {
  const navigate = useNavigate();
  const { messageID, title, message, category, likes, dislikes, replies, username } = props;

  const handleClick = () =>{
    console.log('Card Clicked');
    console.log(messageID);
  };

  const handleLike = () => {
    console.log('like');
  };

  const handleReply = () => {
    console.log(messageID);
    navigate(`/message/${messageID}`)
  };

  const handleDislike = () => {
    console.log("disliked");
  };

  return (
    <Card sx={{ bgcolor: '#E8F8FF', marginBottom: '20px', boxShadow:3, width: '100%' }} variant="outlined">
      <CardContent onClick={handleClick}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{marginBottom: '10px'}}>
          <div>
            <Typography variant="h5" component="h2" sx={{ color: '#000000' }}>
              {title}
            </Typography>
          </div>
          {category && <Chip label={category}  color="primary" />}
        </Stack>
        <Typography variant="body1" color="text.secondary" sx={{ color: '#000000' }}>
          {message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {username}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like" onClick={handleLike}>
          <Badge badgeContent={likes} color="primary">
            <Favorite />
          </Badge>
        </IconButton>
        <IconButton aria-label="dislike" onClick={handleDislike}>
          <Badge badgeContent={dislikes} color="primary">
            <HeartBroken />
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
