import { useState, useEffect } from 'react';
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
import axios from 'axios';

function MessageCard(props) {
  const navigate = useNavigate();
  const [likes,setLikes] = useState([]);
  const [dislikes,setDislikes] = useState([]);
  const { messageID, title, message, category, replies, username } = props;

  useEffect(() => {
    axios.get('http://localhost:80/messages/'+messageID+'/likes')
      .then(response => {
        setLikes(response.data.likesCount);
      })
      .catch(error => {
        console.log(error);
      });

      axios.get('http://localhost:80/messages/'+messageID+'/dislikes')
      .then(response => {
        setDislikes(response.data.dislikesCount);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 


  const handleClick = () =>{
    console.log('Card Clicked');
    console.log(messageID);
  };

  const handleLike = () => {
    console.log('like');
    axios.put('http://localhost:80/messages/'+messageID+'/like', {
      "userId":1
    }).then(response => {
      if(response.data.message === "Message liked successfully") setLikes(likes+1);
      else setLikes(likes-1);
      navigate(0);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const handleReply = () => {
    console.log(messageID);
    navigate(`/message/${messageID}`)
  };

  const handleDislike = () => {
    console.log("disliked");
    axios.put('http://localhost:80/messages/'+messageID+'/dislike', {
      "userId":1
    }).then(response => {
      if(response.data.message === "Message disliked successfully") setDislikes(dislikes+1);
      else setDislikes(likes-1);
      navigate(0);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
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
