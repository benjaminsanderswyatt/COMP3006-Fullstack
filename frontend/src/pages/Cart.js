import React, { useEffect, useState } from 'react';
import { getCartProducts } from '../api/fetchProducts';
import ItemListing from '../components/ItemListing';
import RemoveFromCartButton from '../components/RemoveFromCartButton';
import SkeletonItems from '../components/SkeletonItems';
import io from 'socket.io-client';

const WEBSOCKET_URL = 'http://localhost:82';


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

            setLoading(false);

        } catch (error) {
            setLoading(false);
        }
    }

    const handleRemoveFromCart = (updatedCart) => {
        // Update the cart state after item is removed
        setCart(updatedCart);
    };

    useEffect(() => {
        const socket = io(WEBSOCKET_URL);

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });
        
        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });


        const removeEventKey = `removeUpdate`;

        // Item has been removed from db -> remove from products state
        socket.on(removeEventKey, (productId) => {
            console.log(`Recieved Remove Update: ${productId}`);
        
            setCart((prevProducts) => prevProducts.filter(product => product._id !== productId));
        });


        return () => {
            socket.off(removeEventKey);
            socket.disconnect();
        }

    }, []);


    return (
        <div style={styles.main}>
            <h1>Cart</h1>

            

            {message && <p style={styles.message}>{message}</p>}

            <div style={styles.productList}>


                {loading 
                ? 
                    // Loading item, show skeleton item
                    <SkeletonItems/>
                    
                : 
                    // Products have been loaded
                    cart.length > 0 
                    ? 
                        // Show products
                        cart.map((product) => (
                            <ItemListing 
                            key={product._id} 
                            product={product} 
                            button={<RemoveFromCartButton product={product} onRemove={handleRemoveFromCart}
                            />}/>
                        )) 
                    :
                        // There are no items
                        <p>No item in cart</p>
                }

            </div>

            
        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
    },



    message: {
        color: 'red',
        fontWeight: 'bold',
    },
    productList: {
        background: '#ebf9ff',
        border: 'solid',
        borderColor: '#070810',
        borderRadius: '8px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', // minmax = itemlisting width + 2*padding
        gap: '20px',
        justifyContent: 'center',
        padding: '20px',
        width: 'auto',
        justifyItems: 'center',
    },
};


export default Cart;