import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/userPost'
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';



// below modal style is in cooperated by material ui example on modals
function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  // need classes for styling;
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle);
  // using state hooks  reference:https://reactjs.org/docs/hooks-state.html
  const [posts, setPosts] = useState([]);
  // making a state to check if modal is open or not 
  const [open,setOpen] = useState(false);  
   //implementing useEffect to run code on a condition
  useEffect(() => {
    // onSnapShot is a firebase method like 'listen'An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. (everytime time a new pot is added the code outputs)
    db.collection('posts').onSnapshot(snapshot => {
      // using map to loop through updating posts. '.data' takes entire object elements eg: username, caption, img
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,   /*this id from doc id from firebase */
        post: doc.data()     /*this data of objects caption.image, username */
      })));   
    })
  }, []);

  
  


{/*top heading of appliaction*/}
  return (
    <div className="App">
        {/* // using a modal to incoperate a login email and password*/}
        <Modal 
        open={open}
        // used an in line function instead of a handle onClick function to check for modal action
        onClose={() => setOpen(false)}
        
        >
       <div style={modalStyle} className={classes.paper}>
        <center>
            <img
            className=""
            src="https://images.alphacoders.com/606/thumb-1920-606210.jpg"
            alt="page logo"
            />
            <input
            type='text'
            placeholder='username'
            value={username}
            onChange={(event)=> setUsername(event.target.value)}/>
            <input
            type='text'
            placeholder='email'
            value={email}
            onChange={(event)=> setEmail(event.target.value)}/>
            <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(event)=> setPasswaord(event.target.value)}/>
            
        </center>
       </div>
        </Modal>
      
      <div className="top_heading">
        <h2>FlickGram</h2>
      </div> 
{/* sign up button with inline function used boolean */}
  <Button onClick={() => setOpen(true)}>Sign UP</Button>

{/* using .map to run through objects array order eg. mapping through each post to output*/}     {/* Application posts */}
{/* using an id with key helps only refreshing new post that putput not old posts */}
    {
      posts.map(({id, post}) => (
        <Post key={id} username={post.name} caption={post.caption} imageUrl={post.imageUrl} />
      ))
    }

    </div>
  );
}

export default App;
