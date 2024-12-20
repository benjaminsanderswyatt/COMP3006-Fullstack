import React, { useState, useEffect} from 'react';
import ItemListing from '../components/ItemListing';
import { getMyProducts } from '../api/fetchProducts';
import IncDecRemove from '../components/IncDecRemove';

const CurrentlySelling = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getMyProducts();

            if (response.success){
                setProducts(response.data);
            } else {
                setMessage(response.message);
            }

            setLoading(false);
        }

        fetchProducts();
    }, []);


    return (
        <div style={styles.main}>
            <h1>Currently Selling</h1>
            {message && <p style={styles.message}>{message}</p>}

            <div style={styles.productList}>
                {loading 
                    ? 
                    // Show skeletons while loading products
                    Array.from({ length: 6 }).map((_, index) => (
                        <ItemListing key={index} isLoading />
                    )) 
                    : 
                    // Show the products if they have been fetched
                    products.length > 0 
                    ? 
                    products.map((product) => (
                        <ItemListing 
                            key={product._id} 
                            product={product} 
                            button={<IncDecRemove product={product} />} 
                        />
                    )) 
                    : 
                    // No products are found
                    <p>No products available</p>
                }
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

export default CurrentlySelling;