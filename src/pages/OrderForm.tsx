import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { clearProduct } from '../redux/slices/cartSlice';
import OrderSuccses from '../components/OrderSuccses';
import OrderError from '../components/OrderError';

const OrderForm = () => {
  const order = useSelector((state: RootState) => state.cart.products);
  const dispatch = useAppDispatch();
  const [orderSucces, setOrderSucces] = React.useState(false);
  const [orderError, setOrderError] = React.useState(false);

  const RegistryForm = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      method: '',
      city: '',
      adress: '',
      payment: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
      surname: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
      phone: Yup.number()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
      method: Yup.string().required('Обьязательное поле'),
      city: Yup.string().required('Обьязательное поле'),
      adress: Yup.string().required('Обьязательное поле'),
      payment: Yup.string().required('Обьязательное поле'),
      email: Yup.string().required('Обьязательное поле'),
    }),

    onSubmit: (values) => {
      try {
        axios
          .post('https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/favorite', {
            values,
            order,
          })
          .then(() => {
            dispatch(clearProduct());
            setOrderSucces(true);
          })
          .catch(() => {
            setOrderError(true);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (orderError) {
    return <OrderError />;
  }

  if (orderSucces) {
    return <OrderSuccses />;
  }

  return (
    <>
      <h2>Введите данные для оформления заказа</h2>
      <form className="order" onSubmit={RegistryForm.handleSubmit}>
        <div className="order-props">
          <label htmlFor="name">Ваше имя</label>
          <input
            id="name"
            name="name"
            type="text"
            value={RegistryForm.values.name}
            onChange={RegistryForm.handleChange}
            onBlur={RegistryForm.handleBlur}
          />
          {RegistryForm.errors.name && RegistryForm.touched.name ? (
            <div className="error">{RegistryForm.errors.name}</div>
          ) : null}
        </div>
        <div className="order-props">
          <label htmlFor="surname">Вашa фамилия</label>
          <input
            id="surname"
            name="surname"
            type="text"
            value={RegistryForm.values.surname}
            onChange={RegistryForm.handleChange}
            onBlur={RegistryForm.handleBlur}
          />
          {RegistryForm.errors.surname && RegistryForm.touched.surname ? (
            <div className="error">{RegistryForm.errors.surname}</div>
          ) : null}
        </div>

        <div className="order-props">
          <label htmlFor="phone">Ваш номер телефона</label>
          <input
            id="phone"
            name="phone"
            type="phone"
            value={RegistryForm.values.phone}
            onChange={RegistryForm.handleChange}
            onBlur={RegistryForm.handleBlur}
          />
          {RegistryForm.errors.phone && RegistryForm.touched.phone ? (
            <div className="error">{RegistryForm.errors.phone}</div>
          ) : null}
        </div>
        <div className="order-props">
          <label htmlFor="method">Способ доставки</label>
          <select
            id="method"
            name="method"
            value={RegistryForm.values.method}
            onChange={RegistryForm.handleChange}
            onBlur={RegistryForm.handleBlur}>
            <option value=""> Cпособ доставки</option>
            <option value="courier">Курьером</option>
            <option value="reustrant">Из ресторана</option>
          </select>
          {RegistryForm.errors.method && RegistryForm.touched.method ? (
            <div className="error">{RegistryForm.errors.method}</div>
          ) : null}
        </div>
        <div className="order-props">
          <label htmlFor="city">Ваш город</label>
          <input
            id="city"
            name="city"
            type="city"
            value={RegistryForm.values.city}
            onChange={RegistryForm.handleChange}
            onBlur={RegistryForm.handleBlur}
          />
          {RegistryForm.errors.city && RegistryForm.touched.city ? (
            <div className="error">{RegistryForm.errors.city}</div>
          ) : null}
        </div>
        <div className="order-props">
          <label htmlFor="adress">Адрес доставки</label>
          <input
            id="adress"
            name="adress"
            type="adress"
            value={RegistryForm.values.adress}
            onChange={RegistryForm.handleChange}
            onBlur={RegistryForm.handleBlur}
          />
          {RegistryForm.errors.adress && RegistryForm.touched.adress ? (
            <div className="error">{RegistryForm.errors.adress}</div>
          ) : null}
        </div>
        <div className="order-props">
          <label htmlFor="payment">Способ оплаты</label>
          <select
            id="payment"
            name="payment"
            value={RegistryForm.values.payment}
            onChange={RegistryForm.handleChange}
            onBlur={RegistryForm.handleBlur}>
            <option value="">Выберите способ оплаты</option>
            <option value="USD">Наличными при получении</option>
            <option value="UAH">Опата на карту</option>
          </select>
          {RegistryForm.errors.payment && RegistryForm.touched.payment ? (
            <div className="error">{RegistryForm.errors.payment}</div>
          ) : null}
        </div>
        <div className="order-props">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={RegistryForm.values.email}
            onChange={RegistryForm.handleChange}
            onBlur={RegistryForm.handleBlur}
          />
          {RegistryForm.errors.email && RegistryForm.touched.email ? (
            <div className="error">{RegistryForm.errors.email}</div>
          ) : null}
        </div>
        <div className="order-props order-button">
          <button type="submit">Отправить</button>
        </div>
      </form>
    </>
  );
};

export default OrderForm;
