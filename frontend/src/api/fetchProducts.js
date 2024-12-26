const API_URL = 'http://localhost:82/api/products';

// ---------------------- Store ----------------------

// Fetch all products
export const getAllProducts = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/get`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const responseJson = await response.json();

    if (!responseJson.success) {
      throw new Error(responseJson.message || 'Failed to fetch products');
    }

    return {
      success: true,
      message: responseJson.message,
      data: responseJson.data,
    };

  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { success: false, message: error.message };
  }
}



// ---------------------- Cart ----------------------

// Fetch all products in my cart
export const getCartProducts = async (productIds) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ productIds }),
    });

    const responseJson = await response.json();

    if (!responseJson.success) {
      throw new Error(responseJson.message || 'Failed to fetch cart');
    }
    
    return {
      success: true,
      message: responseJson.message,
      data: responseJson.data,
    };

  } catch (error) {

    console.error('Error fetching cart:', error.message);
    return { success: false, message: error.message };
  }
}


// Buy your cart
export const buyCart = async (cart) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/buycart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ cart: cart }), // Cart containing array of product ids
    });

    const responseJson = await response.json();

    if (!responseJson.success) {
      throw new Error(responseJson.message || 'Failed to buy products');
    }
    
    return {
      success: true,
      message: responseJson.message,
      data: responseJson.data,
    };

  } catch (error) {

    console.error('Error buying products:', error.message);
    return { success: false, message: error.message };
  }
}



// ---------------------- My Products ----------------------

// Add a product
export const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const responseJson = await response.json();

    if (!responseJson.success) {
      throw new Error(responseJson.message || 'Failed to add product');
    }


    return {
      success: true,
      message: responseJson.message,
      data: responseJson.data,
    };

  } catch (error) {
    console.error('Error adding product:', error.message);
    return { success: false, message: error.message };
  }
}



// Fetch all products im selling
export const getMyProducts = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/myproducts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const responseJson = await response.json();

    if (!responseJson.success) {
      throw new Error(responseJson.message || 'Failed to fetch my products');
    }

    return {
      success: true,
      message: responseJson.message,
      data: responseJson.data,
    };

  } catch (error) {

    console.error('Error fetching my products:', error.message);
    return { success: false, message: error.message };
  }
}



// Set stock of product
export const setStock = async (productId, newStock) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/setstock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ _id: productId, stock: newStock }),
    });

    const responseJson = await response.json();

    if (!responseJson.success) {
      throw new Error(responseJson.message || 'Failed to set stock to new amount');
    }
    
    return {
      success: true,
      message: responseJson.message,
      data: responseJson.data,
    };

  } catch (error) {

    console.error('Error setting stock:', error.message);
    return { success: false, message: error.message };
  }
}



// Remove a product
export const removeProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/removeproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ _id: productId }),
    });

    const responseJson = await response.json();

    if (!responseJson.success) {
      throw new Error(responseJson.message || 'Failed to remove product');
    }
    
    return {
      success: true,
      message: responseJson.message,
      data: responseJson.data,
    };

  } catch (error) {

    console.error('Error removing stock:', error.message);
    return { success: false, message: error.message };
  }
}