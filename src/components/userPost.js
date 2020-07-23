import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './userPost.css'

// I will distructrue the attributes of post 
function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
           <div className="userpost__heading">
            {/*heading profile pic bubble & username */}
            <Avatar
                className="userpost_avatar"
                alt='KevinRemy'
                // below is default photo
                src="/static/images/avatar1/jpg" 
                />  
            <h3>{username}</h3>
            </div>
            {/* photo image posted  */}
            <img className="userpost__image" src={imageUrl} alt=""/>

            {/* username & caption under photo */}
        <h4 className="userpost_text"><strong>{username}</strong>{caption}</h4>
        </div>
    )
}

export default Post
