import React, { useState, useEffect } from 'react';
import './App.css';
import UserPost from './components/UserPost'
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import PictureUpload from './components/PictureUpload';
import InstagramEmbed from 'react-instagram-embed';
import Parallax from './Parallax'

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
   // setting the state to each input of signup  
  const [username,setUsername] = useState('');  
  const [password,setPassword] = useState('');  
  const [email,setEmail] = useState('');  
  const [user, setUser]= useState(null);
  // sign in button
  const [openSignIn, setOpenSignIn] = useState('')
  
useEffect(() => {
const unsubscribe = auth.onAuthStateChanged((userAuth) => {  /*onAuthStateChanged keeps user logged in */
    if (userAuth) {          /*user is logged in */
      console.log(userAuth);
      setUser(userAuth);   
    }else{   /*user has logged*/
      setUser(null);
  }
})
return () => {
  // perform some cleanup actions
    unsubscribe()
  }
}, [user,username]);
  

  
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

const signUp = (event) => {
  event.preventDefault();   
  
  // firbase code-->creates user and update profile
  auth
  .createUserWithEmailAndPassword(email, password)  
  .then((userAuth) => {
    return userAuth.user.updateProfile({
    displayName: username
  })
})
  .catch((error) => alert(error.message));    /*preventing refreshing upon submit on page */
  
  setOpen(false);
}
const signIn = (event) =>{
  event.preventDefault();

  auth.signInWithEmailAndPassword (email, password)
  .catch((error) => alert(error.message))    /*email blading formatted message */

  setOpenSignIn(false)
}
  return (
    <div className="App">
     
        <Modal 
        open={open}
        // used an in line function instead of a handle onClick function to check for modal action
        onClose={() => setOpen(false)}
        
        >
      <div style={modalStyle} className={classes.paper}>
      <form className="page__signup">
        <center>
            <img
            className=""
            src="https://cdn.dribbble.com/users/81809/screenshots/3443452/ssg-goku_1x.jpg"
            alt="page logo"
            />
            </center>
            <Input
            type='text'
            placeholder='username'
            value={username}
            onChange={(event)=> setUsername(event.target.value)}/>
            <Input
            type='text'
            placeholder='email'
            value={email}
            onChange={(event)=> setEmail(event.target.value)}/>
            <Input
            type='password'
            placeholder='password'
            value={password}
            onChange={(event)=> setPassword(event.target.value)}/>
            {/* sign up button with inline function used boolean */}
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
       </div>
        </Modal>
        {/* Signin modal */}
        <Modal 
        open={openSignIn}
        // used an in line function instead of a handle onClick function to check for modal action
        onClose={() => setOpenSignIn(false)}
        
        >
      <div style={modalStyle} className={classes.paper}>
      <form className="page__signup">
        <center>
            <img
            className=""
            src="https://cdn.dribbble.com/users/81809/screenshots/3443452/ssg-goku_1x.jpg"
            alt="page logo"
            />
            </center>
            <Input
            type='text'
            placeholder='email'
            value={email}
            onChange={(event)=> setEmail(event.target.value)}/>
            <Input
            type='password'
            placeholder='password'
            value={password}
            onChange={(event)=> setPassword(event.target.value)}/>
            {/* sign up button with inline function used boolean */}
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
       </div>
        </Modal>

        {/*  */}

      <div className="top_heading">
        <img
        className="app__logo"
        src='https://www.kanzenshuu.com/wp-content/uploads/2015/07/super_logo.png'
        alt='dbz logo'
        />
        
      
      {user ? (
         <Button onClick={() => auth.signOut()}>Logout</Button>
    ): (
        <div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
    )}
     </div> 
{/* using .map to run through objects array order eg. mapping through each post to output*/}     {/* Application posts */}
{/* using an id with key helps only refreshing new post that putput not old posts */}
    <div className= "app__posts">
      <div className="app__postsLeftSide">
    {
      posts.map(({id, post}) => (
        <UserPost key={id} 
        postId={id}     /*getting assigned id  for post */
        username={post.username} 
        caption={post.caption} 
        imageUrl={post.imageUrl} />
      ))
    }
    </div>
     {/* Instagram Embedded code from  npmjs.com*/}
     
  </div>

{/* Writing caption & upload pics */}

    </div>
  );
  }

export default App;
