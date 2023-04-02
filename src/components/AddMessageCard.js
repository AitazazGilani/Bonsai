import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate   } from 'react-router-dom';
function AddMessageCard() {
    const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the title and content, like send them to a server
    console.log(title);
    console.log(content);
    navigate("/home")
  };

  return (
    <Card sx={{ bgcolor: '#D8F3DC', marginBottom: '20px' }} variant="outlined">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Title"
            margin="normal"
            variant="outlined"
            value={title}
            sx={{ color: '#081C15' }}
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
            sx={{ color: '#081C15' }}
            onChange={(e) => setContent(e.target.value)}
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