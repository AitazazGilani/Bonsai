import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import axios from 'axios';

function AddReplyCard(props) {
  const [content, setContent] = useState('');
  const {message_id} = props;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the content, send them to a server
    // Do something with the title and content, like send them to a server
    console.log(content);
    axios.post('http://localhost:80/messages/' + message_id +'/replies', {
        text: content,
        username: 'user',
        messageId: message_id
      })
      .then(response => {
        console.log(response.data);
      })
      .then(navigate(0))
      .catch(error => {
        console.log(error);
      });

    
  };

  return (
    <Card sx={{ display: 'flex', mb: 2 , bgcolor: '#E8F8FF'}}>
      <Avatar sx={{ m: 1 }} />
      <form onSubmit={handleSubmit}>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <TextField
          required
          fullWidth
          label="Write your reply!"
          margin="normal"
          variant="outlined"
          value={content}
          sx={{ color: '#081C15', flexGrow: 1, mt:0, width:'25ch' }}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ ml: 1, height:"100%" }}>
          Reply
        </Button>

      </CardContent>
      </form>
    </Card>
  );
}

export default AddReplyCard;