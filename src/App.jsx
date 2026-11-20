import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Cafe from './pages/Cafe';
import Productos from './pages/Productos';
import Producto from './pages/Producto';
import Nosotros from './pages/Nosotros';
import DondeComprar from './pages/DondeComprar';
import NoEncontrado from './pages/NoEncontrado';
import Carrito from './pages/Carrito';
import Pedido from './pages/Pedido';
import ComoHornear from './pages/ComoHornear';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="cafe" element={<Cafe />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:slug" element={<Producto />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="donde-comprar" element={<DondeComprar />} />
        <Route path="como-hornear" element={<ComoHornear />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="pedido" element={<Pedido />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default App;
