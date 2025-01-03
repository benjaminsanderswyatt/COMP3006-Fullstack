import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


const AddToCartButton = ({ product, disabled }) => {
    const navigate = useNavigate();
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        // Check if the product is in your cart
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productInCart = cart.some(item => item._id === product._id);

        setIsInCart(productInCart);
    }, [product]);


    const handleClick = (product) => {
        if (disabled)
            return;

        if (isInCart) {
            // Goto Cart
            navigate('/cart');
        } else {
            
            addToCart(product);
        }
    }

    const addToCart = (product) => {
        // Get the current cart from localstorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Add product to the cart
        cart.push(product);

        // Store back into localstorage
        localStorage.setItem("cart", JSON.stringify(cart));

        setIsInCart(true);

        // Notify "Layout" that the cart has changed
        const event = new CustomEvent('cartUpdated');
        window.dispatchEvent(event);

    }

    // Styles changes based on disabled
    const styles = {
        AddToCartButton: {
        background: disabled ? '#cccccc' : isInCart ? '#4CAF50' : '#3f7faa',
        width: '100%',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontSize: '1rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }
    }



    return (
        <button style={styles.AddToCartButton} onClick={() => handleClick(product)} disabled={disabled}>
            {isInCart ? 'Goto Cart' : 'Add to Cart'}
        </button>
    )
};

export default AddToCartButton;