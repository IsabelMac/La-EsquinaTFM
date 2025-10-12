/*import { useState } from 'react';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Header from './../Categorias/header'; 
import Footer from './../Categorias/footer';
import LogoLE from './../../assets/laesquinalogo.svg';


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('https://mock.apidog.com/m1/920738-903315-default/user');
    if (!res.ok) throw new Error('Error al leer usuarios');
    const users = await res.json();
    const usuario = users.find(u =>
      u.email === formData.email && u.password === formData.password
    );
    if (usuario) {
      localStorage.setItem('user', JSON.stringify(usuario));
      alert('¡Bienvenido, ' + usuario.email + '!');
      window.location.href = '/crearproducto'; 
    } else {
      alert('Email o contraseña incorrectos');
    }
  } catch (error) {
    console.error(error);
    alert('Hubo un error validando tus credenciales');
  }
};
    return (
        <>
        <Header/> 
        <div className={style.forms}>
            <div>
                <img src={LogoLE} alt="logo La Esquina"/>
                <div className={style.container}>
                    <p> ¡Bienvenido!</p>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div>
                            <label>Correo:</label>
                            <input
                                className={style.textoin}
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='administrador@laesquina.com'
                            />
                        </div>
                        <div>
                            <label>Contraseña:</label>
                            <input
                                className={style.textoin}
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='123'
                            />
                        </div>
                        <button className={style.btn} type="submit">Ingresar</button>
                    </form>
                    <span>¿No tienes cuenta? <Link to="/register">Regístrate</Link></span>
                </div>
            </div>
        </div>
        <Footer/> 
        </>
    );
}
export default Login;



/*



import { useState } from 'react';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Header from './../Categorias/header'; 
import Footer from './../Categorias/footer';
import LogoLE from './../../assets/laesquinalogo.svg';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recupera los usuarios del localStorage
        const users = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Busca un usuario que coincida con email y password
        const usuario = users.find(u =>
            u.email === formData.email && u.password === formData.password
        );

        if (usuario) {
            // Guarda usuario activo en localStorage
            localStorage.setItem('user', JSON.stringify(usuario));
            alert('¡Bienvenido, ' + usuario.nombre + '!');
            window.location.href = '/crearproducto';
        } else {
            alert('Email o contraseña incorrectos');
        }
    };


    

    return (
        <>
            <Header/> 
            <div className={style.forms}>
                <div>
                    <img src={LogoLE} alt="logo La Esquina"/>
                    <div className={style.container}>
                        <p>¡Bienvenido!</p>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div>
                                <label>Correo:</label>
                                <input
                                    className={style.textoin}
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='administrador@laesquina.com'
                                />
                            </div>
                            <div>
                                <label>Contraseña:</label>
                                <input
                                    className={style.textoin}
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder='123'
                                />
                            </div>
                            <button className={style.btn} type="submit">Ingresar</button>
                        </form>
                        <span>¿No tienes cuenta? <Link to="/register">Regístrate</Link></span>
                    </div>
                </div>
            </div>
            <Footer/> 
        </>
    );
}

export default Login;




/*

import { useState } from 'react';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Header from './../Categorias/header'; 
import Footer from './../Categorias/footer';
import LogoLE from './../../assets/laesquinalogo.svg';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recupera usuarios del localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Busca usuario con email y password correctos
        const usuario = usuarios.find(u =>
            u.email === formData.email && u.password === formData.password
        );

        if (usuario) {
            localStorage.setItem('user', JSON.stringify(usuario)); // Usuario activo
            alert('¡Bienvenido, ' + usuario.nombre + '!');
            window.location.href = '/crearproducto'; // Redirige al dashboard
        } else {
            alert('Email o contraseña incorrectos');
        }
    };

    return (
        <>
            <Header/> 
            <div className={style.forms}>
                <div>
                    <img src={LogoLE} alt="logo La Esquina"/>
                    <div className={style.container}>
                        <p>¡Bienvenido!</p>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div>
                                <label>Correo:</label>
                                <input
                                    className={style.textoin}
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Contraseña:</label>
                                <input
                                    className={style.textoin}
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className={style.btn} type="submit">Ingresar</button>
                        </form>
                        <span>¿No tienes cuenta? <Link to="/register">Regístrate</Link></span>
                    </div>
                </div>
            </div>
            <Footer/> 
        </>
    );
}

export default Login;






/*
import { useState, useEffect } from 'react';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Header from './../Categorias/header'; 
import Footer from './../Categorias/footer';
import LogoLE from './../../assets/laesquinalogo.svg';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [usuarioActivo, setUsuarioActivo] = useState(null);

    useEffect(() => {
        // Al cargar, revisa si ya hay usuario logueado
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setUsuarioActivo(user);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (usuarioActivo) return; // No permitir login si hay usuario activo

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u =>
            u.email === formData.email && u.password === formData.password
        );

        if (usuario) {
            localStorage.setItem('user', JSON.stringify(usuario));
            setUsuarioActivo(usuario);
            alert('¡Bienvenido, ' + usuario.nombre + '!');
            window.location.href = '/crearproducto';
        } else {
            alert('Email o contraseña incorrectos');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUsuarioActivo(null);
        alert('Sesión cerrada');
    };

    return (
        <>
            <Header/> 
            <div className={style.forms}>
                <div>
                    <img src={LogoLE} alt="logo La Esquina"/>
                    <div className={style.container}>
                        <p>¡Bienvenido!</p>
                        {usuarioActivo ? (
                            <div>
                                <p>Has iniciado sesión como <strong>{usuarioActivo.nombre}</strong></p>
                                <button className={style.btn} onClick={handleLogout}>Cerrar sesión</button>
                            </div>
                        ) : (
                            <form className={style.form} onSubmit={handleSubmit}>
                                <div>
                                    <label>Correo:</label>
                                    <input
                                        className={style.textoin}
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Contraseña:</label>
                                    <input
                                        className={style.textoin}
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className={style.btn} type="submit">Ingresar</button>
                            </form>
                        )}
                        {!usuarioActivo && <span>¿No tienes cuenta? <Link to="/register">Regístrate</Link></span>}
                    </div>
                </div>
            </div>
            <Footer/> 
        </>
    );
}

export default Login;
*/

/*


import { useState, useEffect } from 'react';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Header from './../Categorias/header'; 
import Footer from './../Categorias/footer';
import LogoLE from './../../assets/laesquinalogo.svg';

const API_URL = "https://mock.apidog.com/m1/920738-903315-default/user";

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [usuariosAPI, setUsuariosAPI] = useState([]);
    const [usuarioLogueado, setUsuarioLogueado] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    // ✅ Consultar usuarios de Apidog cuando cargue el componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Error al consultar usuarios");
                const data = await response.json();
                setUsuariosAPI(data);
            } catch (error) {
                console.error("Error API:", error);
            }
        };
        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Usuarios guardados en localStorage (POST local)
        const usuariosLocal = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Buscar en LocalStorage
        const usuarioLocal = usuariosLocal.find(u =>
            u.email === formData.email && u.password === formData.password
        );

        // Buscar en API
        const usuarioAPI = usuariosAPI.find(u =>
            u.email === formData.email && u.password === formData.password
        );

        if (usuarioLocal || usuarioAPI) {
            const usuarioActivo = usuarioLocal || usuarioAPI;
            localStorage.setItem('user', JSON.stringify(usuarioActivo));
            setUsuarioLogueado(usuarioActivo);
            alert(`¡Bienvenido, ${usuarioActivo.nombre}!`);
            window.location.href = '/crearproducto';
        } else {
            alert('Email o contraseña incorrectos');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUsuarioLogueado(null);
        alert('Sesión cerrada');
    };

    return (
        <>
            <Header/> 
            <div className={style.forms}>
                <div>
                    <img src={LogoLE} alt="logo La Esquina" />
                    <div className={style.container}>
                        <p>¡Bienvenido!</p>

                        {/* ✅ Si hay usuario logueado, mostrar botón de cerrar sesión */
                  /*      {usuarioLogueado ? (
                            <div>
                                <p>Ya estás conectado como <b>{usuarioLogueado.nombre}</b></p>
                                <button className={style.btn} onClick={handleLogout}>
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            // ✅ Formulario de login
                            <form className={style.form} onSubmit={handleSubmit}>
                                <div>
                                    <label>Correo:</label>
                                    <input
                                        className={style.textoin}
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Contraseña:</label>
                                    <input
                                        className={style.textoin}
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className={style.btn} type="submit">Ingresar</button>
                            </form>
                        )}
                        {!usuarioLogueado && (
                            <span>¿No tienes cuenta? <Link to="/register">Regístrate</Link></span>
                        )}
                    </div>
                </div>
            </div>
            <Footer/> 
        </>
    );
}

export default Login;
*/













import { useState } from 'react';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Header from './../Categorias/header';
import Footer from './../Categorias/footer';
import LogoLE from './../../assets/laesquinalogo.svg';

const API_URL = 'https://mock.apidog.com/m1/920738-903315-default/user';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // ✅ 1️⃣ Buscar primero en LocalStorage (usuarios creados con POST)
            const usuariosLocal = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioLocal = usuariosLocal.find(u =>
                u.email === formData.email && u.password === formData.password
            );

            if (usuarioLocal) {
                localStorage.setItem('user', JSON.stringify(usuarioLocal));
                alert('¡Bienvenido, ' + usuarioLocal.nombre + '!');
                window.location.href = '/crearproducto';
                return;
            }

            // ✅ 2️⃣ Si no está en LocalStorage, consultar en Apidog
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Error al leer usuarios en Apidog');

            const usuariosAPI = await res.json();
            const usuarioAPI = usuariosAPI.find(u =>
                u.email === formData.email && u.password === formData.password
            );

            if (usuarioAPI) {
                localStorage.setItem('user', JSON.stringify(usuarioAPI));
                alert('¡Bienvenido, ' + (usuarioAPI.nombre || usuarioAPI.email) + '!');
                window.location.href = '/crearproducto';
            } else {
                alert('Email o contraseña incorrectos');
            }
        } catch (error) {
            console.error(error);
            alert('Hubo un error validando tus credenciales');
        }
    };

    return (
        <>
            <Header />
            <div className={style.forms}>
                <div>
                    <img src={LogoLE} alt="logo La Esquina" />
                    <div className={style.container}>
                        <p>¡Bienvenido!</p>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div>
                                <label>Correo:</label>
                                <input
                                    className={style.textoin}
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="administrador@laesquina.com"
                                />
                            </div>
                            <div>
                                <label>Contraseña:</label>
                                <input
                                    className={style.textoin}
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="123"
                                />
                            </div>
                            <button className={style.btn} type="submit">Ingresar</button>
                        </form>
                        <span>
                            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;