import React from 'react'
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/collapse.js'
import'./style.css'
const Nav = ({Toggle}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
  <div className="container-fluid">
    <i className="navbar-brand bi bi-list fs-2"></i>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" 
          id="navbarDropdown" role="button" 
          data-bs-toggle="dropdown" aria-expanded="false">
             ADMIN
          </a>
          <ul className="dropdown-menu" style={{backgroundColor:'#9281c0'}} aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Profil</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Nav
