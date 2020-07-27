import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

const Parallax = () => {
    useEffect(() => {
       let elements = document.querySelectorAll('.parallax');
        M.Parallax.init(elements);
    }, [])
    return (
        <div className='parallax-wrapper'>
            <div className='parallax'>
                <img src='' alt="parallax-image 1"/>
            </div>
            <div className="section">
                
         </div>
        </div>
    )
};

export default Parallax;