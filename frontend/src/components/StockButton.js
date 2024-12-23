import React from 'react';

const StockButton = ({ product, onInc, onDec }) => {

    return (
        <div style={styles.stockHolder}>
            <button style={styles.StockButton} onClick={onInc(product._id)}>
                +
            </button>

            <button style={styles.StockButton} onClick={onDec(product._id)}>
                -
            </button>
        </div>
    )
    
};

const styles = {
    StockButton: {
        background: '#3f7faa',
        width: '100%',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: '4px',
    },
    stockHolder: {
        display: 'flex',
    },
}

export default StockButton;