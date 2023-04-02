import './Landing.css';
import NavigationBarUser from '../components/NavigationBarUser'
import MessageCard from '../components/MessageCard'
import axios from 'axios';
import { useState } from 'react';
import Container from '@mui/material/Container';
import AddMessageFab from '../components/AddMessageFAB';
function Home() {
  const messages =  [
    {
      "id": 1,
      "title": "First message",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "likes": 10,
      "replies": 5
    },
    {
      "id": 2,
      "title": "Second message",
      "content": "This is the second message.",
      "likes": 15,
      "replies": 3
    },
    {
      "id": 3,
      "title": "Third message",
      "content": "This is the third message.",
      "likes": 8,
      "replies": 2
    }
  ]

  const replies = [
    {
      "replyID": 1,
      "messageID":1,
      "username": "RandomGuy",
      "text": "I hate lorem ipsum"
    },
    {
      "replyID": 2,
      "messageID":1,
      "username": "NotRandomGuy",
      "text": "Me too, man cant think of anything original!"
    }
  ]

  /* const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); */


  return (

    <div className="home">
      <NavigationBarUser/>
      <Container maxWidth="xl">
      <header className='home-header'>
        <h1 >Welcome User </h1>
        <div>
        <Container maxWidth="sm">
      {messages.map(message => (
        <MessageCard
          key={message.id}
          messageID={message.id}
          title={message.title}
          message={message.content}
          likes={message.likes}
          replies={message.replies}
        />
      ))}
        </Container>
        </div>
      </header>
      <AddMessageFab/>
      </Container>

    </div>

  );
}

export default Home;
