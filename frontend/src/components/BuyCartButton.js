import React, { useState } from 'react';
import { buyCart } from '../api/fetchProducts';

const BuyCartButton = ({ setCart }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [bought, setBought] = useState('');
    const [failed, setFailed] = useState('');
    const [totalCost, setTotalCost] = useState(0);

    
    const BuyCart = async () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length < 1) {
            setMessage("Your cart is empty.");
            setMessageType('error');
            return;
        }

        try {
            setLoading(true);
            setMessage('Handling transaction...');
            setMessageType('info');

            const response = await buyCart(cart);

            if (response.success){
                setMessage(response.message);
                setMessageType('success');
                
                //Add successProducts to the backend buy api
                const { successful, failed, cost } = response.data;

                setBought(
                    successful.length > 0
                        ? `Bought: ${successful.map(p => p.name).join(', ')}`
                        : ''
                );

                setFailed(
                    failed.length > 0
                        ? `No stock available: ${failed.map(p => p.name).join(', ')}`
                        : ''
                );
                
                setTotalCost(cost);

                
                // Update localStorage to remove successfully purchased items
                const remainingCart = cart.filter(cartItem =>
                    !successful.some(success => success._id === cartItem._id) // Remove successful items
                );
                localStorage.setItem('cart', JSON.stringify(remainingCart));
                
                setCart(remainingCart); // Update the cart products state

            } else {
                setMessage(response.message);
                setMessageType('error');
            }

        } catch (error) {
            setMessage('An error occurred during transaction');
            setMessageType('error');
        }


        
        // Notify "Layout" that the cart has changed
        const event = new CustomEvent('cartUpdated');
        window.dispatchEvent(event);

        setLoading(false);
    }


    // Message colour
    const messageStyle = {
        color:
            messageType === 'success'
                ? 'green'
                : messageType === 'error'
                ? 'red'
                : 'gray',
    };

    return (
        <div>
            <button style={styles.BuyCartButton} onClick={() => BuyCart()} disabled={loading}>
                {loading ? 'Processing...' : 'Buy'}
            </button>

            {message && <p style={{ ...styles.message, ...messageStyle }}>{message}</p>}

            {bought && <p style={styles.boughtMessage}>{bought}</p>}
            {failed && <p style={styles.failedMessage}>{failed}</p>}

            {totalCost > 0 && (
                <p style={styles.totalCost}>You payed: £{totalCost.toFixed(2)}</p>
            )}
        </div>
    )
};

const styles = {
    BuyCartButton: {
        background: 'green',
        width: '100%',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    message: {
        marginTop: '15px',
        fontWeight: 'bold',
    },
    boughtMessage: {
        color: 'green',
        marginTop: '15px',
        fontWeight: 'bold',
    },
    failedMessage: {
        color: 'red',
        marginTop: '15px',
        fontWeight: 'bold',
    },
    totalCost: {
        color: 'blue',
        marginTop: '10px',
        fontWeight: 'bold',
    },
}

export default BuyCartButton;