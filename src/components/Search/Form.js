import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Form = ({ PostOrderData, items }) => {
  const RegistryForm = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      method: '',
      city: '',
      adress: '',
      payment: '',
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
    }),

    onSubmit: (values) => {
      console.log(values);

      axios.post('https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/favorite', {
        values,
        items,
      });
      PostOrderData();
    },
  });

  return (
    <form className="orderRegistry" onSubmit={RegistryForm.handleSubmit}>
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
      <label htmlFor="method">Способ доставки</label>
      <select
        id="method"
        name="method"
        value={RegistryForm.values.method}
        onChange={RegistryForm.handleChange}
        onBlur={RegistryForm.handleBlur}>
        <option value=""> Cпособ доставки</option>
        <option value="USD">Нова Пошта</option>
        <option value="UAH">Укрпошта</option>
        <option value="RUB">Justin</option>
      </select>
      {RegistryForm.errors.method && RegistryForm.touched.method ? (
        <div className="error">{RegistryForm.errors.method}</div>
      ) : null}
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
      <label htmlFor="adress">Номер отделения</label>
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

      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;
