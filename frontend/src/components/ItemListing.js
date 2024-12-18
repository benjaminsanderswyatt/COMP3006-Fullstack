import React from 'react';

const ItemListing = ({ product, isLoading }) => {
  if (isLoading) {
    return (
      <div style={styles.skeletonCard}>
          <div style={styles.skeletonImage}></div>
          <div style={styles.skeletonText}></div>
          <div style={styles.skeletonText}></div>
      </div>
    );
  }


    return (
        <div style={styles.productCard}>
            <img
                src={product.image}
                alt={product.name}
                style={styles.productImage}
            />
            <h3>{product.name}</h3>
            <p>Stock: {product.stock}</p>
        </div>
    );
};

const styles = {
    productCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        width: '200px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    productImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    skeletonCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      width: '200px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f0f0f0',
      animation: 'pulse 1.5s infinite',
  },
  skeletonImage: {
      width: '100%',
      height: '150px',
      borderRadius: '8px',
      backgroundColor: '#e0e0e0',
  },
  skeletonText: {
      height: '15px',
      margin: '10px 0',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
  },
};

export default ItemListing;