import React, { useState } from 'react';
import { addProduct } from '../api/fetchProducts';

const AddItem = ({ onProductAdded }) => {
    const[name, setName] = useState('');
    const [image, setImage] = useState('');
    const [stock, setStock] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newProduct = {name, image, stock};

            const createdProduct = await addProduct(newProduct);

            alert('Product added successfully');
            onProductAdded(createdProduct);
            setName('');
            setStock(0);
        } catch (error) {
            console.error('Error adding product: ', error);
            alert('Failed to add product');
        }
    };

    return (
        <div style={styles.container}>
            <h3>Add New Item</h3>
            <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Stock:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        min="0"
                        required
                    />
                </div>
                <button style={styles.button} type="submit">
                    Add Item
                </button>
            </form>
        </div>
    );
};


const styles = {
    container: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        textAlign: 'center',
        maxWidth: '300px',
    },
    inputGroup: {
        margin: '8px 0',
    },
    button: {
        padding: '10px 16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};


export default AddItem;