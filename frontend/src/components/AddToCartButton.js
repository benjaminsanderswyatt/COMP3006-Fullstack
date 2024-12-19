import React from "react";

const AddToCartButton = ({ product, onAddToCart }) => (
    <button style={styles.AddToCartButton} onClick={() => onAddToCart(product)}>
        Add to Cart
    </button>
);

const styles = {
    AddToCartButton: {
    background: '#3f7faa',
    width: '100%',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
  }
}

export default AddToCartButton;