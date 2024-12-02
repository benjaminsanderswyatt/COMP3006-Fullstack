import React from "react";
import { useState } from "react";


const ItemListing = ({product}) => {
  const {image, name, stock} = product;
  const [stockCount, setStockCount] = useState(stock);

  const handleAddToBasket = () => {
    if (stockCount > 0) {
      setStockCount(stockCount - 1);
      alert(`Added ${name} to basket`);
    } else {
      alert("Out of Stock");
    }
  };

  return (
    <div style={styles.container}>
      <img src={image} alt={name} style={styles.image} />
      <h3 style={styles.name}>{name}</h3>
      <p style={{...styles.stock, color: stockCount === 0 ? 'red' : 'green'}}>In Stock: {stockCount}</p>
      <button
        style={styles.button}
        onClick={handleAddToBasket}
        disabled={stockCount === 0}
      >
        Add to Basket
      </button>
    </div>
  );
};


const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    maxWidth: '200px',
    margin: '16px auto',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  name: {
    fontSize: '18px',
    margin: '8px 0',
  },
  stock: {
    fontSize: '14px'
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};


export default ItemListing;