import React, { useState } from 'react';
import AddProduct from '../components/AddProduct.js';
import CurrentlySelling from '../components/CurrentlySelling.js';

const MyProducts = () => {
    const [products, setProducts] = useState([]);

    // Newly added items are added to state
    const addProductToState = (product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };

    return (
        <div style={styles.main}>

            <AddProduct addProductToState={addProductToState}/>

            <CurrentlySelling products={products} setProducts={setProducts}/>

        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'left',
        width: '100%',
    },
};


export default MyProducts;