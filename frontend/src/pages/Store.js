import React from 'react';
import ItemListing from '../components/ItemListing'

const Store = () => {
  const products = [
    {
      id: 0,
      image: 'https://placehold.co/600x600',
      name: 'Product Zero',
      stock: 10
    },

    {
      id: 1,
      image: 'https://placehold.co/600x600',
      name: 'Product One',
      stock: 888
    },

    {
      id: 2,
      image: 'https://placehold.co/600x600',
      name: 'Product Two',
      stock: 1
    },

    {
      id: 3,
      image: 'https://placehold.co/600x600',
      name: 'Product Three',
      stock: 0
    }
  ];

  return (
    <div>
      <h1>Store</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <ItemListing key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
  
const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 200px)',
    gap: '20px',
    padding: '16px',
    justifyContent: 'center'
  },
};


export default Store;
  