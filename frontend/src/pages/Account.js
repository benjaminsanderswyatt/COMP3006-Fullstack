import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from "react-router";

const WEBSOCKET_URL = 'http://localhost:82';

const Account = () => {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(0); // State to track connected users

    useEffect(() => {
        // Initialize the WebSocket connection
        const socket = io(WEBSOCKET_URL);

        // Listen for updates to the user count
        socket.on('userCount', (count) => {
            setUserCount(count);
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        navigate('/');
      };





    return (
        <div style={styles.main}>
            <button style={styles.logButton} onClick={handleLogout}>Logout</button>
            
            <h1>Account</h1>
            <p>Connected Users: <strong>{userCount}</strong></p>
        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
    },
};


export default Account;