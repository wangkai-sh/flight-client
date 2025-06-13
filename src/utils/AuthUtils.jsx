import CryptoJS from 'crypto-js';

const SECRET_KEY = 'my-secret-key';

export const storeToken  = (token) => {
  try {
    const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    localStorage.setItem('jwtToken', encryptedToken);
  } catch (error) {
    console.error('Failed to save localStorage:', error);
  }
};

export const getToken = () => {
  try {
    const encryptedToken = localStorage.getItem('jwtToken');
    if (!encryptedToken) return null;
    
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Failed to get localStorage:', error);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('jwtToken');
  } catch (error) {
    console.error('Failed to remove localStorage:', error);
  }
};
