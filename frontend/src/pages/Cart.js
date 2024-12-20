import React, { useEffect, useState } from 'react';
import { getCartProducts } from '../api/fetchProducts';


const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Stored cart contains array of product ids
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        
        if (storedCart.length > 0){
            fetchCartProducts(storedCart);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchCartProducts = async (cartIds) => {
        try {
            const response = await getCartProducts(cartIds);

            if (response.success) {
                setCart(response.data);
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setLoading(false);
        }
    }

// Show loading text while fetching
    if (loading) {
        return <div>Loading...</div>; 
    }
    


    return (
        <div style={styles.main}>
            <h1>Cart</h1>
        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
    },

    product: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px 0',
        border: '1px solid #ccc',
        padding: '10px',
    },
    image: {
        width: '100px',
        height: '100px',
        marginRight: '15px',
    },
};


export default Cart;