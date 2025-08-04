import apiClient from './apiClient';

export const fetchDigitalPrintDownloadUrl = async (printId: number): Promise<string> => {
  try {
    const response = await apiClient.get(`/api/v1/digital-prints/${printId}/download`);
    // Assuming the backend returns a JSON object with a 'download_url' field
    return response.data.download_url;
  } catch (error) {
    console.error(`Error fetching digital print download URL for print ID ${printId}:`, error);
    throw error; // Re-throw the error to be handled by the component
  }
};