import React from 'react';
import { useNavigate } from 'react-router';
import UpdateField from '../components/UpdateField';


const Account = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        navigate('/');
    };


    return (
        <div style={styles.main}>
            
            
            <h1>Account</h1>

            <div style={styles.holder}>
                <UpdateField field="username"/>
                <UpdateField field="email"/>
                <UpdateField field="password"/>

                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>

            </div>



            
        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'left',
        width: '100%',
    },
    holder: {

        background: '#ebf9ff',
        border: 'solid',
        borderColor: '#070810',
        borderRadius: '8px',
        display: 'block',
        padding: '20px',
        width: 'auto',
    },
    logoutButton: {
        background: '#FF4747',
        marginTop: '50px',
        width: '50%',
        minWidth: '100px',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
        padding: '5px',
        
      }
};


export default Account;