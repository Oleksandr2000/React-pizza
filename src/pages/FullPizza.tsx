import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;
    id: string;
    types: number[];
    sizes: number[];
    description: string;
    compound: string;
  }>();
  const { id } = useParams();
  const typeNames: string[] = ['тонкое', 'традиционное'];
  const [activeTypes, setActiveTypes] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.products.find((obj: { id: string }) => obj.id === id),
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    if (pizza) {
      const item = {
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        imageUrl: pizza.imageUrl,
        types: typeNames[activeTypes],
        sizes: pizza.sizes[activeSize],
        count: 0,
      };

      dispatch(addProduct(item));
    }
  };

  React.useEffect(() => {
    async function fetchOnePizza() {
      try {
        const { data } = await axios.get(
          `https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/coffee/${id}`,
        );
        setPizza(data);
      } catch (error) {
        console.log('Error');
      }
    }

    fetchOnePizza();
  }, []);

  if (!pizza) {
    return <>'Загрузка'</>;
  }

  return (
    <>
      <div className="fullpizza-block-wrapper">
        <div className="fullpizza-block">
          <img className="fullpizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        </div>
        <div className="fullpizza-block-info">
          <h4 className="fullpizza-block__title">{pizza.name}</h4>
          <div className="fullpizza-block-description">
            <p>
              <b>Описание: </b>
              {pizza.description}
            </p>
          </div>
          <div className="fullpizza-block-compound">
            <p>
              <b>Cостав: </b>
              {pizza.compound}
            </p>
          </div>
          <div className="fullpizza-block__selector">
            <ul>
              {pizza.types.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActiveTypes(index)}
                  className={activeTypes === index ? 'active' : ''}>
                  {typeNames[item]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActiveSize(index)}
                  className={activeSize === index ? 'active' : ''}>
                  {item} см.
                </li>
              ))}
            </ul>
          </div>
          <div className="fullpizza-block__bottom">
            <div className="fullpizza-block__price">от {pizza.price} $</div>
            <div onClick={onClickAdd} className="button button--outline button--add">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              {addedCount > 0 && <i> {addedCount} </i>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPizza;
