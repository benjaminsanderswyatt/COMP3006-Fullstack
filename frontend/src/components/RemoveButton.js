import React from 'react';

const RemoveProduct = ({ product, onRemove }) => {
   
    return (
        <button style={styles.RemoveProduct} onClick={() => onRemove(product._id)}>
            Delete
        </button>
    )
};

const styles = {
    RemoveProduct: {
    background: '#FF4747',
    width: '100%',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
  }
}

export default RemoveProduct;