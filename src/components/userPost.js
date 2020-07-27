import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import './UserPost.css';

// I will distructrue the attributes of post 
function UserPost({ postId, username, caption, imageUrl }) {
//    implementing comment code, declaring it with a useState([]);
const [comments, setComments] = useState([]);
const [comment, setComment] = useState('');

// 
useEffect(() => {
    let unsubscribe;
    if (postId) {
        unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return () => {
            unsubscribe();
        };
      },  [postId])

const sendComment = (event) => {

}

   
    return (
        <div className="post">
           <div className="userpost__heading">
            {/*heading profile pic bubble & username */}
            <Avatar
                className="userpost_avatar"
                alt='kevinremy'
                // below is default photo
                src="/static/images/avatar1/jpg" 
                />  
            <h3>{username}</h3>
            </div>
            {/* photo image posted  */}
            <img className="userpost__image" src={imageUrl} alt=""/>

            {/* username & caption under photo   */}
        <h4 className="userpost__text"><strong>{username}</strong>{caption}</h4>

        <form className="comment__sectionBox">
            <input 
            className="input__post"
            type="text"
            placeholder="Add Comment..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            />
            <button 
            className= 'btn__post'
            type= 'submit'
            disabled= {!comment}
            onClick={sendComment}>
                Post
            </button>

        </form>
        </div>
    )
}

export default UserPost
