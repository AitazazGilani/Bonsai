import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {ToggleButtonGroup, ToggleButton} from '@mui/material/';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

function SortCard(props) {
  const [alignment, setAlignment] = useState('new');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.sortItems(newAlignment);
  };

  return (
    <Card sx={{ display: 'flex', mb: 2 , bgcolor: '#E8F8FF' , justifyContent: 'center' }}>
      <CardContent>
      <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="new">New</ToggleButton>
      <ToggleButton value="liked">Most Liked</ToggleButton>
      <ToggleButton value="disliked">Most Disliked</ToggleButton>
      <ToggleButton value="old">Oldest</ToggleButton>
    </ToggleButtonGroup>
      </CardContent>
    </Card>
  );
}

export default SortCard;