import Constants from 'expo-constants';
const API_URL = Constants.expoConfig?.extra?.API_URL;
console.log('API_URL:', API_URL);
export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, 
        password,
      }),
    });

    if (!response.ok) {
      // If the response is not OK, throw an error with the response status
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json(); 
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const logout = async () => {
  try{
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });

    if (!response.ok) {
      // If the response is not OK, throw an error with the response status
      throw new Error(`Logout failed with status: ${response.status}`);
    }
    const data = await response.json(); 
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}