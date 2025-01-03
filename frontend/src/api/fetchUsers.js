const API_URL = 'http://localhost:82/api/users';


export async function register(username, email, password) {

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Registration failed")
    }

    return {success: true, message: responseJson};

  } catch (error) {
    return {success: false, message: error.message};
  }

}


export const login = async (email, password) => {

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to log in")
    }

    return {success: true, token: responseJson.token};

  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const updateUser = async (accountData) => {
  try {
    const token = localStorage.getItem('token');

    console.log('accountData body:', accountData);

    const body = {
      username: accountData.username || null,
      email: accountData.email || null,
      password: accountData.password || null,
    }

    console.log('Request body:', body);

    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(body), // Username, email & password can be null
    });

    console.log('Request body {}:', { body });

    const responseJson = await response.json();

    console.log('Response:', responseJson);

    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to update user");
    }

    return { success: true, message: responseJson.message };

  } catch (error) {
    return { success: false, message: error.message };
  }


  
};