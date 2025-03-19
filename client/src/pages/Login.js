import { useState } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error message
        try {
            const data = await login(loginData);
            Auth.login(data.token);
        }
        catch (err) {
            console.error('Failed to login', err);
            setErrorMessage('*Username or Password incorrect'); // Set error message
        }
    };
    return (<div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input type='text' name='username' value={loginData.username || ''} onChange={handleChange}/>
      <label>Password</label>
        <input type='password' name='password' value={loginData.password || ''} onChange={handleChange}/>
        <button type='submit'>Submit Form</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      </form>
    </div>);
};
export default Login;
