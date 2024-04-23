import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('access_token');
      navigate('/login');
  };
  return (
    <div >
      <nav className="   navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <a className="navbar-brand" href="s">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to="/home">Home</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/Favoris">Favoris</Link>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" href="s">Link</a> */}

        </li>

       
      </ul>
      <div className="d-flex" >
   
      <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
                        {localStorage.getItem('access_token') ? (
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}
