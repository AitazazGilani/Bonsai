import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate   } from 'react-router-dom';
import axios from 'axios';
function AddMessageCard() {
    const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the title and content, like send them to a server
    console.log(title,content,category);
    axios.post('http://localhost:80/messages/', {
        title: title,
        content: content,
        category: category,
        username: 'user'
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    navigate("/home")
  };

  return (
    <Card sx={{ bgcolor: '#E8F8FF', marginBottom: '20px' }} variant="outlined">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Title"
            margin="normal"
            variant="outlined"
            value={title}
            sx={{ color: '#000000' }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Message Content"
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            value={content}
            sx={{ color: '#000000' }}
            onChange={(e) => setContent(e.target.value)}
          />
           <TextField
            required
            fullWidth
            label="Category"
            margin="normal"
            variant="outlined"
            value={category}
            sx={{ color: '#000000' }}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Post
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddMessageCard;