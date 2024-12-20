const API_URL = 'http://localhost:82/api/products';

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

    if (!response.success) {
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

    if (!response.ok) {
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
