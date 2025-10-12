import { useState, useEffect } from 'react';
import Header from './../Categorias/header';
import Footer from './../Categorias/footer';
import style from './crearproducto.module.css';

const CrearProducto = () => {
  const [formData, setFormData] = useState({
    producto: '',
    precio: '',
    nombrecat: '',
    pasillo: '',
    percha: '',
    nivel: '',
    cover: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [errorCats, setErrorCats] = useState(null);

  // 📥 Cargar categorías y productos locales
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch('https://mock.apidog.com/m1/920738-903315-default/categorias');
        if (!res.ok) throw new Error('Error al obtener categorías');
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error(err);
        setErrorCats('No se pudieron cargar las categorías');
      } finally {
        setLoadingCats(false);
      }
    };

    fetchCategorias();

    const productosLocal = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(productosLocal);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://mock.apidog.com/m1/920738-903315-default/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al crear el producto');

      const nuevoProducto = { id: Date.now(), ...formData };
      const nuevosProductos = [...productos, nuevoProducto];

      localStorage.setItem('productos', JSON.stringify(nuevosProductos));
      setProductos(nuevosProductos);

      setFormData({
        producto: '',
        precio: '',
        nombrecat: '',
        pasillo: '',
        percha: '',
        nivel: '',
        cover: '',
      });

      alert('✅ Producto creado exitosamente');
    } catch (error) {
      console.error(error);
      alert('❌ Hubo un error al crear el producto');
    }
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        {/* 🧩 Columna izquierda: Formulario */}
        <div className={style.formContainer}>
          <p>Ingrese los datos para la creación del nuevo producto</p>
          <form onSubmit={handleSubmit} className={style.form}>
            <input
              name="producto"
              placeholder="Nombre del producto"
              value={formData.producto}
              onChange={handleChange}
              required
            />

            <input
              name="precio"
              placeholder="Precio"
              type="number"
              step="0.01"
              value={formData.precio}
              onChange={handleChange}
              required
            />

            {loadingCats ? (
              <p>Cargando categorías...</p>
            ) : errorCats ? (
              <p>{errorCats}</p>
            ) : (
              <select
                name="nombrecat"
                value={formData.nombrecat}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione categoría</option>
                {categorias.map(cat => (
                  <option key={cat.nombrecat} value={cat.nombrecat}>
                    {cat.nombrecat}
                  </option>
                ))}
              </select>
            )}

            <select
              name="pasillo"
              value={formData.pasillo}
              onChange={handleChange}
              required
            >
              <option value="">Pasillo</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>

            <select
              name="percha"
              value={formData.percha}
              onChange={handleChange}
              required
            >
              <option value="">Percha</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>

            <select
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              required
            >
              <option value="">Nivel</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <input
              type="text"
              name="cover"
              placeholder="URL de la imagen"
              value={formData.cover}
              onChange={handleChange}
              required
            />
            <button className={style.btn} type="submit">Crear Producto</button>              
            

          </form>
        </div>

        {/* 📦 Columna derecha: Lista de productos */}
        <div className={style.productsContainer}>
          <h3>Productos creados</h3>
          {productos.length === 0 ? (
            <p>No hay productos creados aún.</p>
          ) : (
            <div className={style.grid}>
              {productos.map(p => (
                <div key={p.id} className={style.card}>
                  <img src={p.cover} alt={p.producto} />
                  <h4>{p.producto}</h4>
                  <p><strong>Precio:</strong> ${p.precio}</p>
                  <p><strong>Categoría:</strong> {p.nombrecat}</p>
                  <p>
            Este producto se encuentra en el pasillo <strong>0{p.pasillo}</strong>, 
            la percha <strong>0{p.percha}</strong> en el nivel <strong>0{p.nivel}</strong>
          </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CrearProducto;