import React, { useState } from 'react';
import { addProduct } from '../api/fetchProducts.js';

const Create = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [stock, setStock] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // All fields have to exist
        if (!name || !image || !stock) {
            setMessage('All fields are required.');
            return;
        }
        // Minimum of one stock
        if (stock < 1) {
            setMessage('Product must have stock.');
            return;
        }

        // Get all products available
        try {
            const response = await addProduct({ name, image, stock: Number(stock) });

            if (response.success) {
                setMessage('Product added successfully!');
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage('Error adding product.');
            console.error('Error:', error);
        }
    };



    return (
        <div style={styles.main}>
            <h1>Create</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
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
                    <label>Stock:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>Add Product</button>
            </form>

            {message && <p style={styles.message}>{message}</p>}







        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputGroup: {
        margin: '10px 0',
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
        cursor: 'pointer',
        marginTop: '15px',
    },
    message: {
        marginTop: '15px',
        fontWeight: 'bold',
        color: 'green',
    },
};


export default Create;