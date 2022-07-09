import React from 'react';
import { Link } from 'react-router-dom';

const OrderError = () => {
  return (
    <div className="cart cart--empty">
      <h2>Произошла ошибка</h2>
      <p>Попробуйте сделать заказ позже</p>
      <img src="/img/empty-cart.png" alt="erroe-cart" />
      <Link to="/cart" className="button">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default OrderError;
