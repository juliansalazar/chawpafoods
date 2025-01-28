import React from 'react';
import './ProductShowcase.css';

const products = [
  {
    id: 1,
    name: 'Original',
    price: '$24.99',
    image: '/logo.png',
    description_es: 'ES: Hojuelas de avena orgánicas y libres de gluten, ideales para tus recetas saludables.',
    description_en: 'EN: Original Quinoa Avena with Gluten-Free, Organic Blend',
  },
  {
    id: 2,
    name: 'Chocolate',
    price: '$26.99',
    image: '/logo.png',
    description_es: 'ES: Exquisita fusión de quinua con hongos de pino y especias.',
    description_en: 'EN: Original Chocolate Quinoa with Pine and Spice Blend',
  },

  // Add more products as needed
  {
    id: 3,
    name: 'Fine Herbs',
    price: '$26.99',
    image: '/logo.png',
    description_es: 'ES: Exquisita fusión de quinua con hongos de pino y especias.',
    description_en: 'EN: Original Fine Herbs Quinoa with Pine and Spice Blend',
  },
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
            <p>{product.description_es}</p>
            <p>{product.description_en}</p>
            <span>{product.price}</span>
            <button onClick={() => handleBuyClick(product.name)}>Comprar</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductShowcase;
