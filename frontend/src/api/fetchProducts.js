const API_URL = 'http://localhost:82/api/products';

// Add a product
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    return { success: true, message: responseJson};

  } catch (error) {
    console.error('Error adding product:', error);
    return { success: false, message: 'Error adding product' };
  }
}

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/get`, {
      method: 'GET'
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return { success: true, message: responseJson};

  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, message: 'Error fetching products' };
  }
}
