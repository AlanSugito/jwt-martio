import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {useEffect, useState} from 'react';

const UserList = () => {
  const navigate = useNavigate();
  const setToken = useAuth((state) => state.setToken);
  const token = useAuth((state) => state.token);
  const [users, setUsers] = useState([]);

  const getAccessToken = async () => {
    try {
      const {data} = await axios.get('http://localhost:5000/auth/tokens', {
        withCredentials: true,
      });

      setToken(data.data.token);
    } catch (error) {
      navigate('/login', {replace: true});
    }
  };

  const getUsers = async () => {
    try {
      const {data} = await axios.get('http://localhost:5000/users', {
        headers: {Authorization: `Bearer ${token}`},
      });

      console.log(data);
      setUsers(data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) getAccessToken();
    getUsers();
  }, []);
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          Nama: {user.name}, email: {user.email}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
