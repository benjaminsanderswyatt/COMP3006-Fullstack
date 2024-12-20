import React from 'react';
import AddProduct from '../components/AddProduct.js';
import CurrentlySelling from '../components/CurrentlySelling.js';

const MyProducts = () => {

    return (
        <div style={styles.main}>

            <AddProduct />

            <CurrentlySelling />

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