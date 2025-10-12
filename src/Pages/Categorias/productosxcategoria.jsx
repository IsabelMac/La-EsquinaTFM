import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import style from './../Categorias/categorias.module.css';
import Header from './header';
import Footer from './footer';

const ProductosPorCategoria = () => {
  const { idcat } = useParams();
  const location = useLocation();
  const [productos, setProductos] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

 useEffect(() => {
    // Muestra mensaje si viene de CrearProducto.jsx
    if (location.state?.mensaje) {
      setMensaje(location.state.mensaje);
      setTimeout(() => setMensaje(''), 1500);
    }

    const fetchData = async () => {
      try {
        // 🔹 Obtener productos del API
        const res = await fetch('https://mock.apidog.com/m1/920738-903315-default/market');
        const dataAPI = await res.json();

        // 🔹 Obtener productos locales (creados manualmente)
        const dataLocal = JSON.parse(localStorage.getItem('productos')) || [];

        // 🔹 Unir ambos arreglos
        const todos = [...dataAPI, ...dataLocal];

        // 🔹 Filtrar productos por categoría
        const filtrados = todos.filter(prod => String(prod.idcat) === String(idcat));
        setProductos(filtrados);

        // 🔹 Obtener nombre de la categoría
        const catRes = await fetch(`https://mock.apidog.com/m1/920738-903315-default/categorias/${idcat}`);
        const catData = await catRes.json();
        setNombreCategoria(catData.nombrecat || `Categoría ${idcat}`);
      } catch (err) {
        console.error('Error cargando datos:', err);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [idcat, location.state]);

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <>
      <Header />
      {mensaje && <p style={{ background: '#d4edda', padding: '10px', color: '#155724' }}>{mensaje}</p>}

      <form className={style.buscador} method="get" action="/search">
        <input
          className={style.textoin}
          type="search"
          name="query"
          placeholder="Ingrese el nombre del producto"
        />
        <button className={style.btn}>Buscar</button>
        <button className={style.btn}><Link to="/map">Mapa</Link></button>
      </form>

      <div className="container mt-4">
        <h3 className={style.titcateg}>{nombreCategoria}</h3>
        {productos.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          <div className="row g-4">
            {productos.map((prod, index) => (
              <div key={index} className="col-md-3">
             

<Popup 
  trigger={
    <div className={"card p-3 shadow-sm"} style={{ cursor: 'pointer' }}>
      <h6>{prod.producto}</h6>
      <img
        src={prod.cover || prod.imagen}
        className="card-img-top"
        alt={prod.producto}
      />
      <hr className={style.hr} />
      <p>Precio: ${prod.precio}</p>
      <p>
        Este producto se encuentra en el pasillo <strong>0{prod.pasillo}</strong>, 
        la percha <strong>0{prod.percha}</strong> en el nivel <strong>0{prod.nivel}</strong>
      </p>
    </div>
  }
  modal
  nested
>
  {close => (
    <div className={style.popupContenido}>
      <div className={style.contenedor}>
        <div className={style.columnaImagen}>
          <img
            src={prod.cover || prod.imagen}
            alt={prod.producto}
            className={style.imgtam}
          />
        </div>

        <div className={style.columnaTexto}>
          <h4 className={style.nombrep}>{prod.producto}</h4>
          <p><strong>Precio:</strong> ${prod.precio}</p>
          <p>
            Este producto se encuentra en el pasillo <strong>0{prod.pasillo}</strong>, 
            la percha <strong>0{prod.percha}</strong> en el nivel <strong>0{prod.nivel}</strong>
          </p>
          <div className={style.centrarMapa}>
            <button className={style.btn}><Link to="/map">Mapa</Link></button>
            <button className={style.btn} onClick={close}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )}
</Popup>



              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default ProductosPorCategoria;



/*    82                <div className="card p-3 shadow-sm" style={{ cursor: 'pointer' }}> 


 //  <Popup 
                  trigger={
                    <div className={"card p-3 shadow-sm"} style={{ cursor: 'pointer' }}>
                      
                      <h6>{prod.producto}</h6>
                      <img
                        src={prod.cover || prod.imagen}
                        className="card-img-top"
                        alt={prod.producto}
                      />
                      <hr className={style.hr} />
                      <p>Precio: ${prod.precio}</p>
                      <p>
                        Este producto se encuentra en el pasillo <strong>0{prod.pasillo}</strong>, 
                        la percha <strong>0{prod.percha}</strong> en el nivel <strong>0{prod.nivel}</strong>
                      </p>
                    </div>
                  }
                  modal
                  nested
                >
                  {close => (
                    <div className="p-3">
                      <div className={style.contenedor}>
                        <div className={style.columnaImagen}>
                          <img
                            src={prod.cover || prod.imagen}
                            alt={prod.producto}
                            className={style.imgtam}
                          />
                        </div>
                        <div className={style.columnaTexto}>
                          <h4 className={style.nombrep}>{prod.producto}</h4>
                          <p><strong>Precio:</strong> ${prod.precio}</p>
                          <p>
                            Este producto se encuentra en el pasillo <strong>0{prod.pasillo}</strong>, 
                            la percha <strong>0{prod.percha}</strong> en el nivel <strong>0{prod.nivel}</strong>
                          </p>
                          <button className={style.btn}><Link to="/map">Mapa</Link></button>
                          <button className={style.btn} onClick={close}>Cerrar</button>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>*/





