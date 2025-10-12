import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/laesquinalogoblanc.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './../Categorias/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Para saber la ruta actual
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Verificar si hay sesión activa
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogoClick = () => navigate('/');
  const handleAccederClick = () => navigate('/login');
  const handleNuevoClick = () => navigate('/crearproducto');

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Sesión cerrada');
    setIsLoggedIn(false);
    navigate('/');
  };

  // ✅ Detectar si estamos en /crearproducto
  const isCrearProducto = location.pathname === '/crearproducto';

  return (
    <header>
      <div className={style.container}>
        <div className="row align-items-center">
          {/* 🔹 Íconos de navegación */}
          <div className="col">
            {/* 🏠 Home */}
            <FontAwesomeIcon
              icon={faHouse}
              className={`fs-4 ${style.iconNav}`}
              style={{ cursor: 'pointer' }}
              onClick={handleLogoClick}
              title="Inicio"
            />
          </div>
          {/* 🔹 Logo centrado */}
          <div className="col text-center">
            <img
              className={style.logob}
              src={logo}
              alt="Logo"
              style={{ cursor: 'pointer' }}
              onClick={handleLogoClick}
            />
          </div>
            {/* ➕ Nuevo (solo si hay sesión iniciada) */}
          <div className="col">
            {isLoggedIn && (
              <FontAwesomeIcon
                icon={faPlus}
                className={`fs-4 ${style.iconNav} ${isCrearProducto ? style.iconActivo : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={handleNuevoClick}
                title="Nuevo producto"
              />
            )}

            {isLoggedIn ? (
              <button className={"btn btn-outline-light"} onClick={handleLogout}>
                Cerrar sesión
              </button>
            ) : (
              <button className="btn btn-outline-light" onClick={handleAccederClick}>
                Acceder
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
