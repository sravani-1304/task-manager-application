import api from './utils/api';

const testAPI = async () => {
  try {
    console.log('Testing API connection...');
    const response = await api.get('/');
    console.log('API test successful:', response.data);
    return true;
  } catch (error) {
    console.error('API test failed:', error.message);
    return false;
  }
};

export default testAPI;