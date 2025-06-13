import instance from "../services/http";

export const registerApi = (userData) =>
  instance.post('/auth/register', {
    user: {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      country: userData.country,
      phone: userData.phone
    }
  });

export const loginApi = (loginData) =>
instance.post('/auth/login', {
    email: loginData.email,
    password: loginData.password
  });
