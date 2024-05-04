import axios from 'axios';

const api = (token, ...option) =>
  axios
    .create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      baseURL: 'http://localhost:5000',
      withCredentials: true,
      ...option,
    })
    .interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        if (error.statusCode === 403) {
          const {data} = await axios.get('http://localhost:5000/auth/tokens', {
            withCredentials: true,
          });
          localStorage.setItem('accessToken', data.data.accessToken);
        }
      }
    );

export default api;
