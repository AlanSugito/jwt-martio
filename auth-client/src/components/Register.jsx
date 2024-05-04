import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const setRegisterData = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const {
        data: {message},
      } = await axios.post('http://localhost:5000/auth/register', {data});

      alert(message);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onChange={setRegisterData} onSubmit={register}>
      <div className="input">
        <label>name</label>
        <input type="text" name="name" />
      </div>
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

export default Register;
