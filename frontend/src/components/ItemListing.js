import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WEBSOCKET_URL = 'http://localhost:82';


const ItemListing = ({ product, button}) => {
  const [currentStock, setCurrentStock] = useState(product.stock);

  useEffect(() => {
    const socket = io(WEBSOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
  
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });


    const eventKey = `stockUpdate${product._id}`;
    socket.on(eventKey, (newStock) => {
      console.log(`Recieved Stock Update: ${newStock}`);
      setCurrentStock(newStock);
    });

    return () => {
      socket.off(eventKey);
      socket.disconnect();
    }

  }, [product._id]);


  const cardBackground = currentStock === 0 ? { background: '#E5E5E5' } : { background: 'white' };
  
    return (
        <div style={{ ...styles.productCard, ...cardBackground }}>
            <div style={styles.imageHolder}>
              <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    ...styles.productImage,
                    filter: currentStock === 0 ? 'grayscale(100%) blur(1px)' : 'none', // Grey out image to show out of stock
                  }}
                  onError={(e) => (e.target.src = 'https://placehold.co/1600x1200')} // Image to display when image cant be found
              />
              {currentStock === 0 && ( // Overlay out of stock over greyed image
                <div style={styles.outOfStockOverlay}>Out of Stock</div>
              )}
            </div>
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>Price: {product.price}</p>
            <div style={styles.holder}>
              
              <p style={styles.stock}>Stock: {currentStock}</p>
        
              {/* Unique buttons for each page */}
              {button}
              
              
            </div>
        </div>
    );
};

const styles = {
  productCard: {
      border: '1px solid #dddddd',
      borderRadius: '8px',
      padding: '15px',
      width: '200px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(14, 11, 11, 0.1)',
  },
  imageHolder: {
    position: 'relative',
  },
  productImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '8px',
      filter: 'greyscale(1) blur(1px)',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    fontSize: '18px',
    padding: '5px 10px',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  name: {
    margin: '5px',
    overflowWrap: 'anywhere',
  },
  stock: {
    justifySelf: 'left',
    margin: '2px',
    width: '100%'
  },
  price: {

  },
  holder: {
    display: 'flex',
    margin: '5px',
  },

};

export default ItemListing;