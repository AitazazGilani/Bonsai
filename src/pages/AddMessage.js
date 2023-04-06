import './Landing.css';
import NavigationBarUser from '../components/NavigationBarUser'
import MessageCard from '../components/MessageCard'
import axios from 'axios';
import { useState } from 'react';
import Container from '@mui/material/Container';
import AddMessageCard from '../components/AddMessageCard';

function AddMessage() {

  return (
    <div className="home">
      <NavigationBarUser/>
      <Container maxWidth="xl">
      <header className='landing-header'>

        <div>
        <Container maxWidth="sm">
        <AddMessageCard/>
        </Container>
        </div>
      </header>
      </Container>

    </div>
  );
}

export default AddMessage;
