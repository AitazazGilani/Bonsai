import './Landing.css';
import NavigationBarUser from '../components/NavigationBarUser'
import MessageCard from '../components/MessageCard'
import axios from 'axios';
import { useState } from 'react';
import Container from '@mui/material/Container';
import AddMessageFab from '../components/AddMessageFAB';
import SortCard from '../components/SortCard';
function Home() {
  const [messages, setMessages] = useState([
    {
      "id": 1,
      "title": "First message",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "category": "Latin",
      "likes": 10,
      "dislikes": 1,
      "replies": 5,
      "username": "Monke"
    },
    {
      "id": 2,
      "title": "Second message",
      "content": "This is the second message.",
      "category": "Sample",
      "likes": 15,
      "dislikes": 5,
      "replies": 3,
      "username": "Banana"
    },
    {
      "id": 3,
      "title": "Third message",
      "content": "This is the third message.",
      "category": "something",
      "likes": 8,
      "dislikes": 2,
      "replies": 2,
      "username": "Caveman"
    }
  ]);

  const [filteredMessages, setFilteredMessages] = useState([  {
    "id": 1,
    "title": "First message",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "category": "Latin",
    "likes": 10,
    "dislikes": 1,
    "replies": 5,
    "username": "Monke"
  },
  {
    "id": 2,
    "title": "Second message",
    "content": "This is the second message.",
    "category": "Sample",
    "likes": 15,
    "dislikes": 5,
    "replies": 3,
    "username": "Banana"
  },
  {
    "id": 3,
    "title": "Third message",
    "content": "This is the third message.",
    "category": "something",
    "likes": 8,
    "dislikes": 2,
    "replies": 2,
    "username": "Caveman"
  }]);

  

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

  const handleSearch = (query) => {
    console.log(query)
    const filteredData = messages.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()));
    console.log(filteredData)
    setFilteredMessages(filteredData);
  }

  const sortItems  = (sortType) => {
    let sortedItems;
    switch(sortType){
      case "liked":
        sortedItems = messages.slice().sort((a, b) => b.likes - a.likes);
        break;
      case "old":
        sortedItems = messages.slice().sort((a, b) => a.id - b.id);
        break;
      case "new":
        sortedItems = messages.slice().sort((a, b) => b.id - a.id);
        break;
      case "disliked":
        sortedItems = messages.slice().sort((a, b) => b.dislikes - a.dislikes);
        break;
      default:
        sortedItems = messages;
        break;
    }
    setFilteredMessages(sortedItems);

  }

  return (

    <div className="home">
      <NavigationBarUser onSearch={handleSearch}/>
      <Container maxWidth="xl">
      <header className='home-header'>
        <h1 >Welcome User </h1>
        <div>
        <Container maxWidth="sm">
        <SortCard sortItems={sortItems}/>
      {filteredMessages.map(message => (
        <MessageCard
          key={message.id}
          messageID={message.id}
          title={message.title}
          message={message.content}
          category={message.category}
          likes={message.likes}
          dislikes={message.dislikes}
          replies={message.replies}
          username={message.username}
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
