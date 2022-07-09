import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccses = () => {
  return (
    <div className="cart cart--empty">
      <h2>Успешно</h2>
      <p>По необходимости наш менеджер с вами свяжеться</p>
      <img src="/img/succes.jpg" alt="erroe-cart" />
      <Link to="/" className="button">
        <span>Вернуться на главную</span>
      </Link>
    </div>
  );
};

export default OrderSuccses;
