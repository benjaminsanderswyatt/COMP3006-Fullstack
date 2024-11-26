const API_URL = 'http://backend:9000/api/users';


export async function register(username, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return response.json();
}


export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    const data = await response.json();
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      return data.token;
    }

    throw new Error(data.message || 'Login failed');
  } catch (error) {
    console.error(error);
    return null;
  }
};
