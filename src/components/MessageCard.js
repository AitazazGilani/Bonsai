import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Favorite, Reply } from '@mui/icons-material';
import { useNavigate   } from 'react-router-dom';
import { useState } from 'react';

function MessageCard(props) {
  const navigate = useNavigate();
  const { messageID, title, message, likes, replies } = props;
  
  const handleClick = () =>{
    console.log('Card Clicked');
    console.log(messageID);
  }
  const handleLike = () => {
    console.log('like');
  };

  const handleReply = () => {
    console.log(messageID);
    navigate(`/message/${messageID}`)
  };

  return (
    <Card sx={{ bgcolor: '#D8F3DC', marginBottom: '20px', boxShadow:3 }} variant="outlined">
      <CardContent onClick={handleClick}>
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