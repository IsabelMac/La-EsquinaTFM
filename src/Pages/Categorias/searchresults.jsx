/*import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from './../Categorias/categorias.module.css';
import Header from './header';
import Footer from './footer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const SearchResults = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Cargar productos del mock API
        const resProd = await fetch('https://mock.apidog.com/m1/920738-903315-default/market/producto');
        const dataAPI = await resProd.json();

        // 🔹 Cargar productos del localStorage
        const dataLocal = JSON.parse(localStorage.getItem('productos')) || [];

        // 🔹 Cargar categorías desde la API
        const resCats = await fetch('https://mock.apidog.com/m1/920738-903315-default/categorias');
        const dataCats = await resCats.json();

        // 🔹 Guardar datos
        setCategorias(dataCats);
        setProductos([...dataAPI, ...dataLocal]);
        setError(null);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('No se pudieron cargar los productos o categorías.');
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Filtrar resultados por texto buscado
  const resultados = productos.filter(p =>
    p.producto?.toLowerCase().includes(query)
  );

  // 🔹 Función para obtener el nombre de categoría
  const obtenerNombreCategoria = (prod) => {
    // Si el producto ya tiene nombrecat (viene del localStorage)
    if (prod.nombrecat) return prod.nombrecat;

    // Si solo tiene idcat (viene del mock)
    const categoria = categorias.find(c => Number(c.idcat) === Number(prod.idcat));
    return categoria ? categoria.nombrecat : 'Sin categoría';
  };

  return (
    <>
      <Header />
      <form className={style.buscador} method="get" action="/search">
        <input
          className={style.textoin}
          type="search"
          name="query"
          placeholder="Ingrese el nombre del producto"
        />
        <button className={style.btn}>Buscar</button>
      </form>

      <div className="container mt-4">
        <h2>Resultados para: <em>{query}</em></h2>
        {cargando && <p>Cargando...</p>}
        {error && <p className={style.error}>{error}</p>}

        <div className="row g-4">
          {resultados.length === 0 && !cargando && <p>No se encontraron productos.</p>}

          {resultados.map(prod => (
            <div key={prod.id} className="col-md-3">
              <Popup
                trigger={
                  <div className="card p-3 shadow-sm" style={{ cursor: 'pointer' }}>
                    <h6>{prod.producto}</h6>
                    <img
                      src={prod.cover}
                      className="card-img-top"
                      alt={prod.producto}
                    />
                    <hr className={style.hr} />
                    {/* 🔹 Mostrar nombrecat *
                    <p><strong>{obtenerNombreCategoria(prod)}</strong></p>
                    <p><strong>Precio:</strong> ${prod.precio}</p>
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
                      <img src={prod.cover} alt={prod.producto} className={style.imgtam} />
                    </div>
                    <div className={style.columnaTexto}>
                      <h4 className={style.nombrep}>{prod.producto}</h4>
                      <p><strong>{obtenerNombreCategoria(prod)}</strong></p>
                      <p><strong>Precio:</strong> ${prod.precio}</p>
                      <p>
                        Este producto se encuentra en el pasillo <strong>0{prod.pasillo}</strong>,
                        la percha <strong>0{prod.percha}</strong> en el nivel <strong>0{prod.nivel}</strong>
                      </p>
                    <div className={style.centrarMapa}>  
                      <Link to="/map" className={style.btn}>Mapa</Link>
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
      </div>

      <Footer />
    </>
  );
};

export default SearchResults;

*/


import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // 🔹 Importamos Link
import style from './../Categorias/categorias.module.css';
import Header from './header';
import Footer from './footer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const SearchResults = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Productos del mock API
        const resProd = await fetch('https://mock.apidog.com/m1/920738-903315-default/market/producto');
        const dataAPI = await resProd.json();

        // 🔹 Productos del localStorage
        const dataLocal = JSON.parse(localStorage.getItem('productos')) || [];

        // 🔹 Categorías
        const resCats = await fetch('https://mock.apidog.com/m1/920738-903315-default/categorias');
        const dataCats = await resCats.json();

        setCategorias(dataCats);
        setProductos([...dataAPI, ...dataLocal]);
        setError(null);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('No se pudieron cargar los productos o categorías.');
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Filtrar resultados
  const resultados = productos.filter(p =>
    p.producto?.toLowerCase().includes(query)
  );

  // 🔹 Obtener nombre de categoría
  const obtenerNombreCategoria = (prod) => {
    if (prod.nombrecat) return prod.nombrecat;
    const categoria = categorias.find(c => Number(c.idcat) === Number(prod.idcat));
    return categoria ? categoria.nombrecat : 'Sin categoría';
  };

  return (
    <>
      <Header />
      <form className={style.buscador} method="get" action="/search">
        <input
          className={style.textoin}
          type="search"
          name="query"
          placeholder="Ingrese el nombre del producto"
        />
        <button className={style.btn}>Buscar</button>
      </form>

      <div className="container mt-4">
        <h2>Resultados para: <em>{query}</em></h2>
        {cargando && <p>Cargando...</p>}
        {error && <p className={style.error}>{error}</p>}

        <div className="row g-4">
          {resultados.length === 0 && !cargando && <p>No se encontraron productos.</p>}

          {resultados.map(prod => (
            <div key={prod.id} className="col-md-3">
              <Popup
                trigger={
                  <div className="card p-3 shadow-sm" style={{ cursor: 'pointer' }}>
                    <h6>{prod.producto}</h6>
                    <img
                      src={prod.cover}
                      className="card-img-top"
                      alt={prod.producto}
                    />
                    <hr className={style.hr} />
                    <p><strong>{obtenerNombreCategoria(prod)}</strong></p>
                    <p><strong>Precio:</strong> ${prod.precio}</p>
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
                        <img src={prod.cover} alt={prod.producto} className={style.imgtam} />
                      </div>

                      <div className={style.columnaTexto}>
                        <h4 className={style.nombrep}>{prod.producto}</h4>
                        <p><strong>{obtenerNombreCategoria(prod)}</strong></p>
                        <p><strong>Precio:</strong> ${prod.precio}</p>
                        <p>
                          Este producto se encuentra en el pasillo <strong>0{prod.pasillo}</strong>,
                          la percha <strong>0{prod.percha}</strong> en el nivel <strong>0{prod.nivel}</strong>
                        </p>

                        <div className={style.centrarMapa}>
                          {/* 🔹 Botón que lleva a Map.jsx 
                          <Link to="/map" className={style.btn}>Mapa</Link>*/}
                          <Link to="/map" className={style.btn}>Mapa</Link>

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
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;