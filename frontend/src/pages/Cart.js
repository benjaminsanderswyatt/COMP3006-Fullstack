import React, { useEffect } from 'react';


const Cart = () => {
    

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log(cart);
    });

    return (
        <div style={styles.main}>
            <h1>Cart</h1>
        </div>
    );
};

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
    },
};


export default Cart;