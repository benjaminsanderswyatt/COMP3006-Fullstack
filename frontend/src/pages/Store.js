import React, { useState, useEffect } from 'react';
import ItemListing from '../components/ItemListing';
import { getAllProducts } from '../api/fetchProducts';

const Store = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            const response = await getAllProducts();

            if (response.success) {
                setProducts(response.message);
            } else {
                setMessage(response.message);
            }
        };

        getProducts();
    }, []);


    return (
        <div style={styles.main}>
            <h1>Store</h1>
            {/* List all the products */}
            {message && <p style={styles.message}>{message}</p>}

            <div style={styles.productList}>
                {products.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    products.map((product) => (
                        <ItemListing key={product._id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
    },
    message: {
        color: 'red',
        fontWeight: 'bold',
    },
    productList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
    },
};


export default Store;