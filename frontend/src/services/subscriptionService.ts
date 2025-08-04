import apiClient from './apiClient';

export const cancelSubscription = async (): Promise<any> => { // Replace any with a more specific type for cancellation response
  try {
    const response = await apiClient.post('/api/v1/subscriptions/cancel');
    return response.data;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error; // Re-throw the error to be handled by the component
  }
};