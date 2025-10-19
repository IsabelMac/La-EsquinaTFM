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