import React from 'react';
import debounce from 'lodash.debounce';
import './search-module.scss';

type SearchProps = {
  setSearchValue: any;
};

const Search: React.FC<SearchProps> = ({ setSearchValue }) => {
  const [newValue, setNewValue] = React.useState('');

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      setSearchValue(str);
    }, 400),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className="root">
      <input type="text" placeholder="Поиск пицы..." onChange={onChangeInput} value={newValue} />
      <img src="/img/search_icon.svg" alt="search" />
    </div>
  );
};

export default Search;
