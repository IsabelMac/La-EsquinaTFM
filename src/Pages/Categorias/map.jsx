import { Link } from 'react-router-dom';
import style from './../Categorias/categorias.module.css';
import Header from './header'; 
import mapa from './../../assets/mapa.png';

const Mapa = () => {
  return (
    <>
      <Header />
        <div className={style.categorias}>
            <form className={style.buscador} method="get" action="/search">
                <input
                    className={style.textoin}
                    type="search"
                    name="query"
                    placeholder="Ingrese el nombre del producto"
                />
                <button className={style.btn}>Buscar</button>
            </form>
              <img src={mapa} alt="mapa" />
        </div> 
    </>
  );
};
export default Mapa;
