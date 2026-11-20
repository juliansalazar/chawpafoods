import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { CarritoProvider } from './lib/carrito';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
