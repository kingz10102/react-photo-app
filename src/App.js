import React, { useState } from 'react';
import './App.css';
import Post from './components/userPost'

function App() {
  // using state hooks  reference:https://reactjs.org/docs/hooks-state.html
  const [posts, setPosts] = useState([
    // creating object element
    {
      // first post
      username:"PrinceofSayians" ,
      caption:"I am the Prince of ALL Sayains!!!!",
      imageUrl:"https://i.redd.it/gkzkc9dr6xr31.jpg" 
    },
    {
      // second post
      username:"KakarotGOD",
      caption:"MAN!!!!! and I'm still hungry",
      imageUrl:"https://media.tenor.com/images/8180a32d0235dd080529f84a5b121324/raw" 
    }
  
  ]);
  
  
  
  
  
  
  
    {/*top heading of appliaction*/}
  return (
    <div className="App">
      <div className="top_heading">
        <h2>FlickGram</h2>
      </div> 

{/* using .map to run through objects array order eg. mapping through each post to output*/}     {/* Application posts */}
    {
      posts.map(post => (
        <Post username={post.name} caption={post.caption} imageUrl={post.imageUrl} />
      ))
    }
    
  
      
    </div>
  );
}

export default App;
