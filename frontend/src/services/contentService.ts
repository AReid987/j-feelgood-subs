import apiClient from './apiClient';

interface ExclusiveContent {
  id: number;
  title: string;
  content: string;
  // Add other exclusive content properties as needed
}

export const fetchExclusiveContent = async (): Promise<ExclusiveContent[]> => {
  try {
    const response = await apiClient.get('/api/v1/exclusive-content');
    return response.data;
  } catch (error) {
    console.error('Error fetching exclusive content:', error);
    throw error; // Re-throw the error to be handled by the component
  }
};