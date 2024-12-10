const API_URL = 'http://localhost:81/api/products';


export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/get`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};


export const addProduct = async (newProduct) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct)
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

