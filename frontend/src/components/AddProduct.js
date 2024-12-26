import React, { useState } from 'react';
import { addProduct } from '../api/fetchProducts.js';
import ItemListing from './ItemListing.js';
import AddToCartButton from '../components/AddToCartButton';

const AddProduct = ( { addProductToState } ) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Stores if the error is 'success' or 'error'
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // All fields have to exist
        if (!name || !image || !price || !stock) {
            setMessage('All fields are required.');
            setMessageType('error');
            return;
        }
        // Minimum of one stock
        if (stock < 1) {
            setMessage('Product must have stock.');
            setMessageType('error');
            return;
        }
        // Must cost something
        if (price <= 0) {
            setMessage('Product must have a price.');
            setMessageType('error');
            return;
        }


        try {
            const response = await addProduct({ name, image, price: Number(price), stock: Number(stock) });

            if (response.success) {
                setMessage(response.message);
                setMessageType('success');
                
                // Add product to currently selling state
                addProductToState(response.data); 
            } else {
                setMessage(response.message);
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error adding product.');
            setMessageType('error');
            console.error('Error:', error);
        }
    };

    // Preview of added item
    const product = {
        name: name || "Name",
        image: image,
        price: price || "?",
        stock: stock || "?"
    };

    // Message colour, green for success, red for failure
    const messageStyle = messageType === 'success' ? { color: 'green' } : { color: 'red' };

    return (
        <div style={styles.main}>
            <h1>Add a new product</h1>
            
            <div style={styles.holder}>
                <div>
                    <h4 style={styles.previewHead}>Preview</h4>
                    <ItemListing key={product._id} product={product} button={<AddToCartButton product={product} disabled={true}/>}/>
                </div>



                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label>Product Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                            min="4"
                            max="32"
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Image URL:</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (value === '' || (!isNaN(value) && value >= 0 && value <= 999))
                                    setPrice(value)
                            }}
                            style={styles.input}
                            min="0"
                            max="999"
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Stock:</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (value === '' || (!isNaN(value) && value >= 1 && value <= 999))
                                    setStock(value)
                            }}
                            style={styles.input}
                            min="1"
                            max="999"
                        />
                    </div>

                    {message && <p style={{ ...styles.message, ...messageStyle }}>{message}</p>}

                    <button type="submit" style={styles.button}>Add Product</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
    },
    holder: {
        background: '#ebf9ff',
        border: 'solid',
        borderColor: '#070810',
        borderRadius: '8px',
        display: 'inline-flex',
        gap: '20px',
        justifyContent: 'center',
        padding: '20px',
        width: 'auto',
        justifyItems: 'center',
    },
    previewHead: {
        margin: '5px',
    },
    form: {
        display: 'block',
    },
    inputGroup: {
        margin: '10px 0',
        display: 'flex',
        flexFlow: 'column',
    },
    input: {
        padding: '8px',
        width: '200px',
        margin: '5px 0',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '15px',
    },
    message: {
        marginTop: '15px',
        fontWeight: 'bold',
    },
};

export default AddProduct;