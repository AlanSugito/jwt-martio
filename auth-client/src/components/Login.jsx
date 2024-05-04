import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const token = useAuth((state) => state.token);
  const setToken = useAuth((state) => state.setToken);
  const [credentials, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/users');
  }, [token, navigate]);

  const setRegisterData = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        'http://localhost:5000/auth/login',
        {
          data: credentials,
        },
        {withCredentials: true}
      );

      alert(data.message);
      setToken(data.data.accessToken);
      navigate('/users');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onChange={setRegisterData} onSubmit={login}>
      <div className="input">
        <label>Email</label>
        <input type="text" name="email" />
      </div>
      <div className="input">
        <label>Password</label>
        <input type="password" name="password" />
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
