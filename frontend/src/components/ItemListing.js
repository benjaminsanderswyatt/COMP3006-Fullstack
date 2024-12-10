import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9000");


const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    socket.io('initialProducts',(data) => {
      setProducts(data);
    });

    socket.on('productUpdated', (updatedProduct) => {
        setProducts((prevProducts) => {
          prevProducts.map((product) => 
            product._id === updatedProduct._id ? updatedProduct : product
          )
        });
    });

    return () => {
      socket.disconnect();
    };

  }, []);

  const updateStock = (productId, newStockCount) => {
    socket.emit('updateStock', {productId, newStockCount});
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => {
          <li key={product.img}>
            <img src={product.img} alt={product.name} width="50"/>
            <p>{product.name}</p>
            <p>Stock: {product.stockCount}</p>
            <button onClick={() => updateStock(product._id, product.stockCount -1)}>
              Decreased Stock
            </button>
          </li>
        })}
      </ul>
    </div>
  );



};

export default Products;