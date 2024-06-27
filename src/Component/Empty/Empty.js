import React, { useEffect, useState } from 'react'
import './Empty.css'
import img from '../../Images/cafe signin bg.jpg'

export default function Empty() {
    const token = sessionStorage.getItem("token");
    
    const [imageStatus, setImageStatus] = useState(true);

    useEffect(() => {
        // Fetch the initial status from the server using fetch
        fetch('http://localhost:6789/food/status')
            .then(response => response.json())
            .then(data => setImageStatus(data.status))
            .catch(error => console.error('Error fetching the status:', error));
    }, []);

    const toggleImageStatus = () => {
        fetch('http://localhost:6789/food/toggle', {
            method: 'POST',
            headers: {
                'X-auth-token': token
            }
        })
            .then(response => response.json())
            .then(data => setImageStatus(data.status))
            .catch(error => console.error('Error toggling the status:', error));
    };

    return (
        <div className="App">
            <button onClick={toggleImageStatus}>
                {imageStatus ? 'Mark as Sold Out' : 'Show Image'}
            </button>
            <div className={`image-container ${imageStatus ? '' : 'blur'}`}>
                {!imageStatus && <div className="text-overlay">Sold Out</div>}
                <img src={img} alt="Product" />
            </div>
        </div>
    );}
