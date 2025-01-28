import React from 'react';
import HeroSection from './components/HeroSection';
import ProductShowcase from './components/ProductShowcase';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import './App.css';
import { FloatingWhatsApp } from 'react-floating-whatsapp'

function App() {
  return (
    <>
      <FloatingWhatsApp
        phoneNumber="+593995124401" // WhatsApp number
        title="Chat con nosotros" // Popup title
        accountName='Chawpa Foods'
        float={true} // Show/hide the popup
        position="right" // Position of the popup.
        rounded={false} // Rounded corners of the popup.
        url="https://api.whatsapp.com/send?phone=+593995124401&text=Hola%20soy%20un%20cliente%20de%20Chawpa%20Foods!" // WhatsApp URL when clicked.
        avatar='/logo.png' //
        chatMessage='Hola 🤝, ¿cómo podemos ayudarte hoy?'
        placeholder='Hola 🤝 quería hacer un pedido Original!'
        />
      <HeroSection />
      <ProductShowcase />
      <Footer />
    </>
  );
}

export default App;
