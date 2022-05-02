
   
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Login = () => {

  const { handleAuth } = useContext(AuthContext);
	const [loginData, setLoginData] = useState({});

	const navigate = useNavigate();

	const handleChange = e => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	};
	const handleSubmit = async e => {
		e.preventDefault();
		const { data } = await axios.post(
			'http://localhost:8080/orders',
			loginData
		);
		if (data.token) {
			handleAuth(true);
			navigate(-2, { replace: true });
		}
	};




  return (
    <div>
      <input
        className="username"
        type="text"
        name="username"
        placeholder="Enter Username"
        onChange={handleChange}
      />
      <input
        className="password"
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
      />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
      <button className="submit" onSubmit={handleSubmit}>Login</button>
    </div>
  );
};
