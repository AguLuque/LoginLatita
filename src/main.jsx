// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App.jsx'; // Importa tu componente principal
import './index.css'; // Importa tus estilos si los tienes
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
