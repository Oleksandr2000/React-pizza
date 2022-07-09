import React from 'react';
// import qs from 'qs';
import Categories from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import PizzBlock from '../components/PizzBlock';
import Skeleton from '../components/Skeleton';
import Search from '../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';
// import { useNavigate } from 'react-router-dom';
// import { setFilters } from '../redux/slices/filterSlise';
// import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const [searchValue, setSearchValue] = React.useState('');

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const isSearch = React.useRef(false);
  // const isMaunted = React.useRef(false);

  const activeCategoryId = useSelector((state: RootState) => state.filter.activeCategory);
  const sortType = useSelector((state: RootState) => state.filter.activeSort);
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const getPizzas = async () => {
    const order = sortType.sort.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sort.replace('-', '');
    const category = activeCategoryId > 0 ? `category=${activeCategoryId}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
      }),
    );
  };

  // React.useEffect(() => {
  //   if (isMaunted.current) {
  //     const queryString = qs.stringify({
  //       sort: sortType.sort,
  //       activeCategoryId,
  //     });

  //     console.log(queryString);

  //     navigate(`?${queryString}`);
  //   }
  //   isMaunted.current = true;
  // }, [activeCategoryId, sortType]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     console.log(params);

  //     const sortURL = sortList.find((obj) => obj.sort === params.sort);
  //     console.log(sortURL);

  //     dispatch(
  //       setFilters({
  //         ...params,
  //         sortURL,
  //       }),
  //     );
  //   }
  //   isSearch.current = true;
  // }, []);

  React.useEffect(() => {
    getPizzas();
  }, [activeCategoryId, sortType, searchValue]);

  const visibleItems = items
    .filter((item: { name: string }) => {
      if (item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((item: any) => <PizzBlock key={item.id} {...item} />);
  const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <div className="content__header">
          <h2 className="content__title">Все пиццы</h2>
          <Search setSearchValue={setSearchValue} />
        </div>
        {status === 'error' ? (
          <div className="cart cart--empty">
            <h2 className="error__loading">Произошла ошибка</h2>
            <p>
              Простите за неудобстава, нам нужно немного времени чтоб устранить неполадки, в скором
              времени сервис возобновит свою роботу ...
            </p>
            <img src="/img/empty-cart.png" alt="Empty-cart" />
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeleton : visibleItems}</div>
        )}
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
