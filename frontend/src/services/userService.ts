import apiClient from './apiClient';

interface User {
  id: number;
  email: string;
  // Add other user properties as needed (exclude sensitive info like password hash)
}

export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get('/api/v1/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error; // Re-throw the error to be handled by the component
  }
};