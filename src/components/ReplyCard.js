import React from 'react';
import { Card, CardContent,CardActions ,Typography, Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Favorite, Reply, HeartBroken } from '@mui/icons-material';


const ReplyCard = ({ reply }) => {

  const handleLike = () => {
    console.log('like');
  };

  const handleReply = () => {
    console.log("starting reply to a reply");
  };

  const handleDislike = () => {
    console.log("Disliked")
  }


  return (
    <Card sx={{ display: 'flex', mb: 2 , bgcolor: '#E8F8FF'}}>
      <Avatar src={reply.avatarUrl} sx={{ m: 1 }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{color:'#000000'}}>
          {reply.text}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {reply.username}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like" onClick={handleLike}>
          <Badge badgeContent={reply.likes} color="primary">
            <Favorite />
          </Badge>
        </IconButton>
        <IconButton aria-label="like" onClick={handleDislike}>
          <Badge badgeContent={reply.dislikes} color="primary">
            <HeartBroken />
          </Badge>
        </IconButton>
        <IconButton aria-label="reply" onClick={handleReply}>
          <Badge badgeContent={reply.replies} color="primary">
            <Reply />
          </Badge>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ReplyCard;