import React, { useState, useEffect} from 'react';
import ItemListing from '../components/ItemListing';
import { getMyProducts, removeProduct } from '../api/fetchProducts';
import SetRemoveButtons from '../components/SetRemoveButtons';
import SkeletonItems from '../components/SkeletonItems';

const CurrentlySelling = ( { products, setProducts } ) => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getMyProducts();

            if (response.success){
                setProducts(response.data);
            } else {
                setMessage(response.message);
                setMessageType('error');
            }

            setLoading(false);
        }

        fetchProducts();

    }, [setProducts]);


    const onRemove = async (productId) => {
        console.log("Removed");
        // Remove the product from state
        // Optimistic approach
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));

        // Remove from db
        const response = await removeProduct(productId);

        if (response.success) {
            setMessage(response.message);
            setMessageType('success');
        } else {
            setMessage(response.message);
            setMessageType('error');
        }
    }
    

    // Message colour, green for success, red for failure
    const messageStyle = messageType === 'success' ? { color: 'green' } : { color: 'red' };

    return (
        <div style={styles.main}>
            <h1>Currently Selling</h1>
            {message && <p style={{ ...styles.message, ...messageStyle }}>{message}</p>}

            <div style={styles.productList}>
                {loading 
                    ? 
                    // Show skeletons while loading products
                    Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonItems/>
                    )) 
                    : 
                    // Show the products if they have been fetched
                    products.length > 0 
                    ? 
                    products.map((product) => (
                        <ItemListing 
                            key={product._id} 
                            product={product} 
                            button={<SetRemoveButtons product={product} onRemove={onRemove}/>} 
                        />
                    )) 
                    : 
                    // No products are found
                    <p>No products being sold</p>
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
        marginTop: '15px',
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