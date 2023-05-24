import './Landing.css';
import NavigationBarUser from '../components/NavigationBarUser'
import MessageCard from '../components/MessageCard'
import AddReplyCard from '../components/AddReplyCard';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate   } from 'react-router-dom';
import Container from '@mui/material/Container';
import ReplyCard from '../components/ReplyCard';
import { useParams } from 'react-router-dom';

//pass in :id as route parameter over here, then use the id to query db to get that message and replies
function ExpandedMessage(props) {
const [message, setMessage] = useState([]);
const [replies, setReplies] = useState([]);
const {id} = useParams();
const navigate = useNavigate();

  //query message by id
   useEffect(() => {
    axios.get('http://localhost:80/messages/'+id)
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 
  //query replies by that messages id
  useEffect(() => {
    axios.get('http://localhost:80/messages/'+id+'/replies')
      .then(response => {
        setReplies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);  

  return (
    <div className="home">
      <NavigationBarUser/>
      <Container maxWidth="xl">
      <header className='landing-header'>

        <div>
        <Container maxWidth="sm">
        <MessageCard
          key={message.id}
          messageID={message.id}
          title={message.title}
          message={message.content}
          category={message.category}
          likes={message.likes}
          replies={message.replies}
          username={message.username}
        />
        <AddReplyCard message_id={message.id}/>
         {replies.map((reply, index) => (
            <ReplyCard key={index} reply={reply} />
          ))} 
        </Container>
        </div>
        

      </header>
      </Container>

    </div>
  );
}

export default ExpandedMessage;
