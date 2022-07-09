import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import React from 'react';
import OrderForm from './pages/OrderForm';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="/order" element={<OrderForm />} />
      </Routes>
    </div>
  );
}

export default App;
