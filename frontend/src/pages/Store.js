import React, { useState, useEffect } from 'react';
import ItemListing from '../components/ItemListing';
import { getAllProducts } from '../api/fetchProducts';
import AddToCartButton from '../components/AddToCartButton';

const Store = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // Start loading at true (false when successful load)

    useEffect(() => {
        const getProducts = async () => {
            const response = await getAllProducts();

            if (response.success) {
                setProducts(response.message);
            } else {
                setMessage(response.message);
            }

            setLoading(false); // Replace skeleton with loaded products
        };

        getProducts();
    }, []);


    const product = {
        name: "Test Name",
        image: "https://placehold.co/600x400",
        stock: 999,
        _id: "test-product-1", // Ensure a unique key for the product
    };

    return (
        <div style={styles.main}>
            <h1>Store</h1>
            {/* List all the products */}
            {message && <p style={styles.message}>{message}</p>}

            <div style={styles.productList}>

                {loading 
                ? 
                    // Loading products, show skeleton items
                    Array.from({ length:6 }).map((_,index) => (
                        <ItemListing key={index} isLoading/>
                    )) 
                : 
                    // Products have been loaded
                    products.length > 0 
                    ? 
                        // Show products
                        products.map((product) => (
                            <ItemListing key={product._id} product={product} button={<AddToCartButton product={product} />}/>
                        )) 
                    :
                        // There are no products
                        <p>No products available</p>
                }

            </div>
        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'left',
        width: '100%',
    },
    message: {
        color: 'red',
        fontWeight: 'bold',
    },
    productList: {
        background: '#ebf9ff',
        border: 'solid',
        borderColor: '#070810',
        borderRadius: '8px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', // minmax = itemlisting width + 2*padding
        gap: '20px',
        justifyContent: 'center',
        padding: '20px',
        width: 'auto',
        justifyItems: 'center',
    },
};


export default Store;