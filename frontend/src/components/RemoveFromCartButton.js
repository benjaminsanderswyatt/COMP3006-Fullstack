import React from 'react';

const RemoveFromCartButton = ({ product, onRemove }) => {

    const RemoveFromCart = (productId) => {

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