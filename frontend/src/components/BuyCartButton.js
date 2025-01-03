import React, { useState } from 'react';
import { buyCart } from '../api/fetchProducts';

const BuyCartButton = () => {
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
                const { successProducts, failedProducts, totalCost } = response.data;

                setBought(
                    successProducts.length > 0
                        ? `Bought: ${successProducts.map(p => p.name).join(', ')}`
                        : ''
                );

                setFailed(
                    failedProducts.length > 0
                        ? `No stock available: ${failedProducts.map(p => p.name).join(', ')}`
                        : ''
                );
                
                setTotalCost(totalCost);

                // Update localStorage to remove successfully purchased items
                const remainingCart = cart.filter(cartItem =>
                    failedProducts.some(failed => failed.id === cartItem.id)
                );
                localStorage.setItem('cart', JSON.stringify(remainingCart));
                

                
                // Layout like
                // Cost: £49.49
                // Bought: productName1,
                //         productName2,
                //
                // No stock available: productNameA,
                //                     productNameB,
                //                     productNameC,

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
                <p style={styles.totalCost}>Cost: £{totalCost.toFixed(2)}</p>
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