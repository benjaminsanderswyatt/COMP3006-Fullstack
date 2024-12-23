import React from 'react';

const RemoveFromCartButton = ({ product, onRemove }) => {

    const RemoveFromCart = (productId) => {
        console.log(`Removing ${productId}`);

        // Get the current cart from localstorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Remove the product with the given productId
        const updatedCart = cart.filter(item => item._id !== productId);

        // Store back into localstorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Remove the item from the Cart.js state
        onRemove(updatedCart);
    }

    return (
        <button style={styles.RemoveFromCartButton} onClick={() => RemoveFromCart(product._id)}>
            Remove
        </button>
    )
};

const styles = {
    RemoveFromCartButton: {
    background: '#FF4747',
    width: '100%',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
  }
}

export default RemoveFromCartButton;