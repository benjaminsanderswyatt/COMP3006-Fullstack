import React from 'react';

const ItemListing = ({ product }) => {
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
};

export default ItemListing;