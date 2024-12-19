import React from "react";

const RemoveProduct = ({ product, removeProduct }) => (
    <button style={styles.RemoveProduct} onClick={() => removeProduct(product)}>
        Remove
    </button>
);

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