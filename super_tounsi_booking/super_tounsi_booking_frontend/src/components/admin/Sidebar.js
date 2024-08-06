import React from 'react'
import Logo from '../../image/Logo.png'
import "./style.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Sidebar = () => {
  const [active,setActive]=useState(1);
  return (

    <div className='bg-dark p-2'>
    <div >
        <img src={Logo} alt='logo' style ={{width:'60px',height:'60px'}}/>
        <span className='brand-name fs-6 text-center' style={{color:"#4a919e",fontWeight:'Bold'}}>Super tounsi</span>
    </div>
    
    <div className=' list-group list-grpup-flush'>
    <a className={active ===1? ' active list-group-item-dark py-2' :'list-group-item-dark py-2'} onClick={e=>setActive(1)} >
    <i className='bi bi-speedometer2 f-5 me-3' style={{color:'#fff'}}></i>
    <Link to="/DashboardAdmin/Home">
    <span  style={{color:'#fff',fontWeight:'Bold'}}>Dashboard</span>
    </Link>
    </a>
    <a className={active ===2? ' active list-group-item-dark py-2' :'list-group-item-dark py-2'} onClick={e=>setActive(2)} >
    <i className='bi bi-person f-5 me-3' style={{color:'#fff'}}></i>
    <Link to="/DashboardAdmin/ListeEmployee">
    <span style={{color:'#fff',fontWeight:'Bold'}}>Emlpyees</span>
    </Link>
    </a>
    <a className={active ===3? ' active list-group-item-dark py-2' :'list-group-item-dark py-2'} onClick={e=>setActive(3)} >
    <i className='bi bi-person f-5 me-3' style={{color:'#fff'}}></i>
    <span style={{color:'#fff',fontWeight:'Bold'}}>technicians</span>
    </a>
    <a className={active ===4? ' active list-group-item-dark py-2' :'list-group-item-dark py-2'} onClick={e=>setActive(4)} >
    <i className='bi bi-clock-history f-5 me-3' style={{color:'#fff'}}></i>
    <span style={{color:'#fff',fontWeight:'Bold'}}>History</span>
    </a>
    <a className='list-group-item-dark py-2 '>
    <i className="bi bi-box-arrow-left f-5 me-3" style={{color:'#fff'}}></i>
    <span style={{color:'#fff',fontWeight:'Bold'}}>LOGOUT</span>
    </a>
    </div>
  </div>

  )
}

export default Sidebar
