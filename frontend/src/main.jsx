import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Notebook from './pages/Notebook.jsx';
import Celular from './pages/Celular.jsx';
import Ambos from './pages/Ambos.jsx';
import TutorialDetalhe from './pages/TutorialDetalhe.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="notebook" element={<Notebook />} />
          <Route path="celular" element={<Celular />} />
          <Route path="ambos" element={<Ambos />} />
          <Route path="tutorial/:id" element={<TutorialDetalhe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
