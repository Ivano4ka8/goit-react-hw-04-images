import { useState } from 'react';

import { Form, Input, SearchIcon, ButtonSearch } from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };
  return (
    <header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
        <ButtonSearch type="submit">
          <SearchIcon />
        </ButtonSearch>
      </Form>
    </header>
  );
};
