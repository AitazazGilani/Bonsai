import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

const ReplyCard = ({ reply }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2 , bgcolor: '#D8F3DC'}}>
      <Avatar src={reply.avatarUrl} sx={{ m: 1 }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {reply.text}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {reply.username}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReplyCard;