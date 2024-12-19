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
                            <ItemListing key={product._id} product={product} button={<IncDecRemove product={product} />}/>
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


export default MyProducts;