import React from 'react';

const BuyCartButton = ({ product }) => {

    const BuyCart = (productId) => {

    }

    return (
        <button style={styles.BuyCartButton} onClick={() => BuyCart(product._id)}>
            Buy
        </button>
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
  }
}

export default BuyCartButton;