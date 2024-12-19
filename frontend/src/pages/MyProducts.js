import React from 'react';
import AddProduct from '../components/AddProduct.js';
import CurrentlySelling from '../components/CurrentlySelling.js';
import ItemListing from '../components/ItemListing.js';

const MyProducts = () => {
    const product = {
        name: "Test Name",
        image: "https://placehold.co/600x400",
        stock: 999,
        _id: "test-product-1", // Ensure a unique key for the product
    };

    return (
        <div style={styles.main}>

            <AddProduct />

            <CurrentlySelling />

            

            <ItemListing key={product._id} product={product} button={<AddToCartButton product={product} />}/>

        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
    },
};


export default MyProducts;