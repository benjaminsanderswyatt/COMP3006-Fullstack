import React from 'react';

const ItemListing = ({ product, isLoading, button }) => {
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
                onError={(e) => (e.target.src = 'https://placehold.co/1600x1200')} // Image to display when image cant be found
            />
            <h3 style={styles.name}>{product.name}</h3>
            <div style={styles.holder}>
              <p style={styles.stock}>Stock: {product.stock}</p>
              
              {/* Unique buttons for each page */}
              {button}
            </div>
        </div>
    );
};

const styles = {
  productCard: {
    background: 'white',
      border: '1px solid #dddddd',
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
  name: {
    margin: '5px',
  },
  stock: {
    justifySelf: 'left',
    margin: '2px',
    width: '100%'
  },
  holder: {
    display: 'flex',
    margin: '5px',
  },




  
  skeletonCard: {
    border: '1px solid #dddddd',
    borderRadius: '8px',
    padding: '15px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f0f0f0',
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