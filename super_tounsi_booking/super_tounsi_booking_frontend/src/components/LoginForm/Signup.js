import React, { useState,useEffect } from 'react';
import './LoginFrom.css';
import logo from '../../image/Logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user-info'));
        if (user) {
            if (user.role === 'admin') {
                navigate("/DashboardAdmin/Home");
            } else if (user.role === 'user') {
                navigate("/DashboardEmp");
            }
        }
    }, []);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole]=useState('');

    async function register() {
        let item = { name, email,role, password };
        console.warn(item);
        let result = await fetch("http://localhost:8000/api/Signup", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
        if (result.status === 'success') {
            alert("Signup Successfully");
        }
        let user = JSON.parse(localStorage.getItem('user-info'))
        if (user.role === 'admin') {
            navigate("/DashboardAdmin/Home");
            }
            else if (user.role === 'user') {
                navigate("/DashboardEmp");
            }
        
    }

    return (
        <>
            <div className='container'>
                <div className='container-form'>
                    <IconButton size="large" onClick={() => {navigate('/')}}>
                        <ArrowBackIcon />
                    </IconButton>
                    <div className='text'>Signup</div>

                    <div className="Rectangle3">
                        <img className='logo' src={logo} alt='logo' />
                        <h3 style={{ color: '#717170', textAlign: 'center' }}>ADMIN</h3>
                        <input className='Rectangle4' type='text'
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)} required />
                            <select className='Rectangle4' value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="">Select Role</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                        <input className='Rectangle4' type='text'
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                        <input className='Rectangle4' type='password'
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                        <button className='bt1' onClick={register}>Signup</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
