import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

function AddReplyCard() {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the content, send them to a server
    console.log(content);
    //navigate("/home")
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