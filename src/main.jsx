// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App.jsx'; // Importa tu componente principal
import './Components/Style.jsx'; // Importa tus estilos si los tienes
// Importar el Router de React Router DOM

import { BrowserRouter } from 'react-router-dom';
//import './Estilos/Style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. Envuelve el componente App en el BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
