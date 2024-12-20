import React, { useState } from 'react';
import AddProduct from '../components/AddProduct.js';
import CurrentlySelling from '../components/CurrentlySelling.js';
import ItemListing from '../components/ItemListing.js';
import IncDecRemove from '../components/IncDecRemove';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Start loading at true (false when successful load)


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