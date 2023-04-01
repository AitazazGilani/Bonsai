import './Landing.css';
import NavigationBarUser from '../components/NavigationBarUser'
import MessageCard from '../components/MessageCard'
import { useState } from 'react';

function Home() {
  return (
    <div className="home">
      <NavigationBarUser/>
      <header className='home-header'>
        <h1 >Welcome User </h1>
        <p className='paragraph'>You will find posts here</p>
        <div>
      <MessageCard title="Welcome" message="This is a message card" />
      <MessageCard title="Welcome" message="This is a message card" />
      <MessageCard title="Welcome" message="This is a message card" />
        </div>
        </header>

    </div>
  );
}

export default Home;
