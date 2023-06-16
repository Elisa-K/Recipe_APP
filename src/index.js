import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout';
import Home from './pages/Home'
import DishType from './pages/DishType';
import './styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.min.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/type/:dish" element={<DishType />} />
        <Route path="/search" />
        <Route path="*" />
      </Routes>
    </Layout>
  </Router>
  // </React.StrictMode>
);

