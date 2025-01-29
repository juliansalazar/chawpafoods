import React from 'react';
import './ProductShowcase.css';

const products = [
  {
    id: 1,
    name: 'Mezcla Pan de Yuca',
    presentation: '250 gramos',
    price: '$6.99 inc. IVA',
    image: '/mezcla2.jpg',
    description_es: 'Mezcla para preparar Pan de Yuca, rinde 16 porciones de 25 gramos aprox. Sólo agregue agua.',
  },
  {
    id: 2,
    name: 'Congelado Natural',
    presentation: '20 Unidades',
    price: '$6.00 (Excento de IVA)',
    image: '/congelado.jpg',
    description_es: 'Pan de Yuca Tradicional Congelado listo para hornear. Contiene 20 porciones de 25 gramos cada una.',
  },
  // Add more products as needed
];

function ProductShowcase() {
  const handleBuyClick = (productName) => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+593995124401&text=Hola%20soy%20un%20cliente%20de%20Chawpa%20Foods!%20Estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(productName)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="product-showcase" id="products">
      <h1 style={{color: 'white'}}>Nuestros Productos</h1>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <h3>{product.presentation}</h3>
            <p>{product.description_es}</p>
            <span>{product.price}</span>
            <button onClick={() => handleBuyClick(product.name)}>Comprar</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductShowcase;
