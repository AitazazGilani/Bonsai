import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';

const FloatingButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(22),
}));

function AddMessageFab() {
  return (
    <FloatingButton
      color="primary"
      aria-label="add"
        component={RouterLink}
      to="/AddMessage"
    >
      <AddIcon />
    </FloatingButton>
  );
}

export default AddMessageFab;