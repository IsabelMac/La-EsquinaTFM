import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/laesquinalogoblanc.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './../Categorias/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'; 

function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleAccederClick = () => {
    navigate('/login');
  };

  return (
    <header>
      <div className={style.container}>
        <div className="row align-items-center">
          <div className="col">
            <FontAwesomeIcon icon={faHouse} className="text-light fs-4" style={{ cursor: 'pointer' }}
              onClick={handleLogoClick}/>
          </div>
          <div className="col">
            <img
              className={style.logob}
              src={logo}
              alt="Logo"
              style={{ cursor: 'pointer' }}
              onClick={handleLogoClick}
            />
          </div>   
          <div className="col">
            <button
              className="btn btn-outline-light"
              onClick={handleAccederClick}
            >
              Acceder
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
