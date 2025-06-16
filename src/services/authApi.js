import instance from "../services/http";

export const registerApi = async (userData) => {
  const response = await instance.post('/auth/register', {
    user: {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      country: userData.country,
      phone: userData.phone
    }
  })

  return response.data;
};

export const loginApi = async (loginData) => {
  const response = await instance.post('/auth/login', {
    email: loginData.email,
    password: loginData.password
  })

  return response.data;
};
