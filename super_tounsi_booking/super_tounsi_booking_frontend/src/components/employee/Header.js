import React from 'react'
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/collapse.js'
import Logo from '../../image/Logo.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'))
  function logOut()
  {
    localStorage.clear();
    navigate('/')
    
  }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-darklight">
        <div className="container-fluid">
      
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <img src={Logo} alt="logo"     width="50"
        height="50"
        className="d-inline-block align-top" 
        />
          <Link to='/DashboardEmp' className="navbar-brand">Super Tounsi</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to ='/DashboardEmp' className="nav-link active" aria-current="page" >
                <i className='bi bi-speedometer2 f-5 me-3' style={{color:'#fff'}}></i>
                Dashboard
                </Link>
              </li>
              <li className="nav-item">
              <Link to ='/MailEmp' className="nav-link active" aria-current="page" >
              <i className='bi bi-person f-5 me-3' style={{color:'#fff'}}></i>
              Mails
              </Link>
            </li>
              <li className="nav-item">
                <Link to ='/DashboardEmp/ReporysEmp' className="nav-link active" aria-current="page" >
                <i className='bi bi-card-text f-5 me-3' style={{color:'#fff'}}></i>
                Reports</Link>
              </li>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" 
                  id="navbarDropdown" role="button" 
                  data-bs-toggle="dropdown" aria-expanded="false">
                  {user && user.name}
                  </a>
                  <ul className="dropdown-menu" style={{backgroundColor:'#9281c0'}} aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item">{user && user.Id}</a></li>
                    <Link to="/SettingsEmp">
                    <li><a className="dropdown-item">Settings</a></li>
                    </Link>
                    <li><a className="dropdown-item" onClick={logOut}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Header
