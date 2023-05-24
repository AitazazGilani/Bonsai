import './Landing.css';
import NavigationBarUser from '../components/NavigationBarUser'
import MessageCard from '../components/MessageCard'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import AddMessageFab from '../components/AddMessageFAB';
import SortCard from '../components/SortCard';
import { useParams } from 'react-router-dom';

function Home() {
  const [userToken,setUserToken] = useState([]);
  const [messages, setMessages] = useState([]);
  const {id} = useParams();
  const [filteredMessages, setFilteredMessages] = useState([]);
    
  useEffect(() => {
    axios.get('http://localhost:80/messages/')
      .then(response => {
        setMessages(response.data);
        setFilteredMessages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 

  
  const handleSearch = (query) => {
    console.log(query)
    const filteredData = messages.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()) || item.username.toLowerCase().includes(query.toLowerCase()));
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
