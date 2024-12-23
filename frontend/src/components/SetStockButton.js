import React, { useState } from 'react';
import { setStock } from '../api/fetchProducts';

const SetStock = ({ product, onSet }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [newStock, setNewStock] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    
    const handleSetStock = async () => {
        const stockValue = parseInt(newStock);

        if (stockValue < 0 || stockValue > 999) {
            setMessage('Please enter a valid number between 0 and 999.');
            setMessageType('error');

            return;
        }

        try {
            const response = await setStock(product._id, stockValue);

            if (response.success) {
                setMessage(response.message);
                setMessageType('success');

                onSet(product._id, stockValue)
            } else {
                setMessage(response.message);
                setMessageType('error');
            }

        } catch (error) {
            setMessage('Failed to update stock. Please try again later.');
            setMessageType('error');
        }


    };


    // Handle closing the popup
    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
        setMessageType('');
        setNewStock('');
    };


    return (
        <div>
            {/* Button to trigger popup */}
            <button style={styles.SetStockButton} onClick={() => setShowPopup(true)}>
                Set Stock
            </button>

            {/* Popup */}
            {showPopup && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popupContent}>
                        {/* Close button */}
                        <button onClick={handleClosePopup} style={styles.closeButton}>×</button>
                        
                        <h3>Enter Stock Quantity</h3>
                        <input
                            type="number"
                            value={newStock}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (value === '' || (!isNaN(value) && value >= 1 && value <= 999))
                                    setNewStock(value)
                            }}
                            min="0"
                            max="999"
                            style={styles.inputField}
                        />
                        
                        <div style={styles.buttonContainer}>
                            <button onClick={handleSetStock} style={styles.submitButton}>Set Stock</button>
                            <button onClick={handleClosePopup} style={styles.cancelButton}>Cancel</button>
                        </div>

                        {/* Message display */}
                        {message && (
                            <div style={{ ...styles.message, ...{ color: messageType === 'success' ? 'green' : 'red' } }}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    SetStockButton: {
        background: '#3f7faa',
        width: '100%',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    popupOverlay: {
        zIndex: '1',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        minWidth: '250px',
        position: 'relative',
    },
    inputField: {
        margin: '10px 0',
        padding: '10px',
        width: '80%',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '10px',
    },
    submitButton: {
        background: '#3f7faa',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    cancelButton: {
        background: 'gray',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '30px',
        border: 'none',
        background: 'transparent',
        color: '#333',
        cursor: 'pointer',
    },
    message: {
        marginTop: '15px',
        fontWeight: 'bold',
    }
};

export default SetStock;
