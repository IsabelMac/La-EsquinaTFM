import { useState } from 'react';
import style from './register.module.css';
import { Link } from "react-router-dom";
import Header from './../Categorias/header'; 
import Footer from './../Categorias/footer';
import LogoLE from './../../assets/laesquinalogo.svg';

function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Guardar en localStorage
        const usuariosPrevios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuariosPrevios.some(u => u.email === formData.email)) {
            alert('Este email ya está registrado localmente');
            return;
        }
        localStorage.setItem('usuarios', JSON.stringify([...usuariosPrevios, formData]));

        // POST a Apidog
        try {
            const response = await fetch('https://mock.apidog.com/m1/920738-903315-default/usuariosnew', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Respuesta de Apidog:', data);

            if (!response.ok) {
                throw new Error('Error al crear usuario en Apidog');
            }

            alert('Registro exitoso!');
            setFormData({ nombre: '', email: '', password: '' });
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al registrar en Apidog, pero se guardó localmente.');
        }
    };

    return (
        <>
            <Header/>
            <div className={style.forms}>
                <div>
                    <img src={LogoLE} alt="logo La Esquina"/>
                    <div className={style.container}>
                        <p>¡Crea tu cuenta!</p>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div>
                                <label>Nombre:</label>
                                <input
                                    className={style.textoin}
                                    type="text"
                                    name="nombre"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>
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
                            <button className={style.btn} type="submit">Registrarme</button>
                        </form>
                        <span className="login">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></span>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Register;


