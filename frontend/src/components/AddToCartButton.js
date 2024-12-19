import React from "react";

const AddToCartButton = ({ product, disabled }) => {

    const handleClick = (product) => {
        if (disabled)
            return;

        addToCart(product);
    }

    const addToCart = (product) => {
        // Get the current cart from localstorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Add product to the cart
        cart.push(product);

        // Store back into localstorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Styles changes based on disabled
    const styles = {
        AddToCartButton: {
        background: disabled ? '#cccccc' : '#3f7faa',
        width: '100%',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontSize: '1rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }
    }



    return (
        <button style={styles.AddToCartButton} onClick={handleClick(product)} disabled={disabled}>
            Add to Cart
        </button>
    )
};

export default AddToCartButton;