import React from 'react';
import './Loading.css'; // Import your CSS file for styling

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loader"></div>
            <p className='load'>Loading...</p>
        </div>
    );
};

export default Loading;
