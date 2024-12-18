import React, { useState, useEffect } from 'react';
import ItemListing from '../components/ItemListing';
import { fetchProducts } from '../api/fetchProducts';

const Store = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const loadProducts = async () => {
            const products = await fetchProducts();
            setProducts(products);
        };

        loadProducts();
    }, []);

    return (
        <div style={styles.main}>
            <h1>Store</h1>
            {/* List all the products */}
            <div style={styles.productGrid}>
                {products.map((product) => (
                    <ItemListing key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginTop: '20px',
    },
};


export default Store;