import React from 'react'
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/collapse.js'
import Logo from '../../image/Logo.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from '../../pages/login/Login';
const Header = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'))
  function logOut()
  {
    localStorage.clear();
    navigate('/')
    
  }

    return (
        <div>
        {
            localStorage.getItem('user-info')?

           <>
             <nav className="navbar navbar-expand-lg navbar-dark bg-darklight">
             <div className="container-fluid">
      
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <img src={Logo} alt="logo"     width="50"
        height="50"
        className="d-inline-block align-top" 
        />
          <Link to='/DashboardAdmin/Home' className="navbar-brand">Super Tounsi</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to ='/DashboardAdmin/Home' className="nav-link active" aria-current="page" >
                <i className='bi bi-speedometer2 f-5 me-3' style={{color:'#fff'}}></i>
                Dashboard
                </Link>
              </li>
              <li className="nav-item">
              <Link to ='/Mail' className="nav-link active" aria-current="page" >
              <i className='bi bi-person f-5 me-3' style={{color:'#fff'}}></i>
              Mails
              </Link>
            </li>
              <li className="nav-item">
                <Link to ='/DashboardAdmin/ListeEmployee' className="nav-link active" aria-current="page" >
                <i className='bi bi-person f-5 me-3' style={{color:'#fff'}}></i>
                Employees
                </Link>
              </li>
              <li className="nav-item">
                <Link to ='/DashboardAdmin/ListTechnicians' className="nav-link active" aria-current="page" >
                <i className='bi bi-person f-5 me-3' style={{color:'#fff'}}></i>
                
                Technicians</Link>
              </li>
              <li className="nav-item">
                <Link to ='/DashboardAdmin/Reports' className="nav-link active" aria-current="page" >
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
                  <Link to="/Settings">
                  <li><button type="button" className="btn btn-outline-dark btn-sm">Settings</button></li>
                  </Link>
                    <li><button type="button" className="btn btn-outline-dark btn-sm" onClick={logOut}>Logout</button></li>
                  </ul>
                </li>
              </ul>
            </div>
            </ul>
          </div>
        </div>
      </nav>
      </>
      :
      <>
      <Login/>
      </>
    }
    </div>
  )
}

export default Header
