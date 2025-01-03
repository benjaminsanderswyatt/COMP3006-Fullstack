import React from 'react';

const RemoveFromCartButton = ({ product, onRemove }) => {

    const RemoveFromCart = (productId) => {
        console.log(`Removing ${productId}`);

        // Get the current cart from localstorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Remove the product with product Id
        const updatedCart = cart.filter(item => item._id !== productId);

        // Store back into localstorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Remove the item from the Cart state
        onRemove(updatedCart);

        // Notify "Layout" that the cart has changed
        const event = new CustomEvent('cartUpdated');
        window.dispatchEvent(event);
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
  },
  message: {
    marginTop: '15px',
    fontWeight: 'bold',
  },
}

export default RemoveFromCartButton;