// Auth.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginUser from '../API/Api'
import './Login.css';


function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await loginUser(username, password);
            console.log('Login response:', response);
            const token = response.access_token;
            localStorage.setItem('token', token);
            console.log('Token stored in localStorage:', token);
            setError(null);
            setSuccessMessage('Logged in successfully.');
            navigate('/page');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='page-login'>
            <div className='login-img'>
                <div className='login-logo'>
                    <Link to="/"><img src={require('../Assets/img/physioApp 3 (1).png')} alt="icône" /></Link>
                    <Link className='link-home' to="/"><h1>PhysioApp</h1></Link>
                </div>
                <div className='img-login'>
                </div>
            </div>
            <div className='login-form'>
                <div class="language-selector">
                    <select name="lang" id="lang">
                        <option value="fr"><i class="fas fa-flag"></i> Français</option>
                        <option value="ar"><i class="fas fa-flag"></i> العربية</option>
                        <option value="en"><i class="fas fa-language"></i> English</option>
                        <option value="de"><i class="fas fa-globe"></i> Deutsch</option>
                    </select>
                    <span class="icon"><i class="fas fa-caret-down"></i></span>
                </div>
                <div className='form-login'  >
                    <form onSubmit={handleLogin}>
                        <h1>Log In</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        <h2>Your ID</h2>
                        <input
                            className='input-login'
                            type="text"
                            placeholder="Your ID"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <h2>Your password</h2>
                        <input
                            className='input-login'
                            type="password"
                            placeholder="**************************"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='boutton-login' type="submit" >Log in</button>
                        {error && <p className='P-error' style={{ color: 'red' }}>{error}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Auth;