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
//const [message, setMessage] = useState([]);
//const [replies, setReplies] = useState([]);
const {id} = useParams();
const navigate = useNavigate();
const message =  
  {
    "id": 1,
    "title": "First message",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "likes": 10,
    "replies": 5
  }

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


  //query message by id
/*   useEffect(() => {
    axios.get('/api/messages')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 
  //query replies by that messages id
  useEffect(() => {
    axios.get('/api/replies')
      .then(response => {
        setReplies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);  */

  return (
    <div className="home">
      <NavigationBarUser/>
      <Container maxWidth="xl">
      <header className='home-header'>

        <div>
        <Container maxWidth="sm">
        <MessageCard
          key={message.id}
          messageID={message.id}
          title={message.title}
          message={message.content}
          likes={message.likes}
          replies={message.replies}
        />
        <AddReplyCard/>
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
