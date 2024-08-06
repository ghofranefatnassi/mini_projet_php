import React ,{ useState ,useEffect}from 'react'
import './LoginFrom.css'
import logo from '../../image/nos.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  useEffect(()=>{
    if (localStorage.getItem('user-info')) {
      let user = JSON.parse(localStorage.getItem('user-info'))
      if (user.role === 'admin') {
        navigate("/DashboardAdmin/Home");
        }
        else if (user.role === 'user') {
            navigate("/DashboardEmp");
        }
    }
},[]);


  async function login(){
    let item = {email,password};
    let result = await fetch("http://localhost:8000/api/Login",{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify(item)
    
  });
  if (result.error) {
    
    alert(result.error);
  }
  if (!result.ok) {
    const errorMessage = await result.text();
    alert('error',errorMessage);
    return;
  }
  result = await result.json();
  localStorage.setItem("user-info",JSON.stringify(result));
  let user = JSON.parse(localStorage.getItem('user-info'))
        if (user.role === 'admin') {
        navigate("/DashboardAdmin/Home");
        }
        else if (user.role === 'user') {
            navigate("/DashboardEmp");
        }
  
  
  }
  async function handleAdminSignup() {
    const adminPassword = prompt("Please enter admin password:");
    if (adminPassword === "super tounsi admin") {
      navigate("/Signup");
    } else if (adminPassword !== "super tounsi admin") {
      alert("Incorrect admin password. You are not authorized as admin.");
    }
  }

  return (
    <>
    <div className='container'>
      <div className='container-form'>
      <IconButton  size="large" onClick={() => {navigate('/')}}>
        <ArrowBackIcon/>
      </IconButton>
      <div className='text'>Login</div>
      
      <div className="Rectangle3">

        <img className='logo' src={logo}alt='logo'/>
        <input  name="email"  className='Rectangle4' 
        type='text' placeholder="E-mail" 
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        required/>
        
        <input name="password"  className='Rectangle4' 
        type='password' placeholder="Password" 
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        required/>
        <button className='signupBt' onClick={handleAdminSignup}>Signup</button>
        <button className='bt1' onClick={login} >Login</button>
      </div>
      </div>
    </div>
    </>
  )
}

export default LoginForm
