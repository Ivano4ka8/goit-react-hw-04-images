import { Component } from 'react';

import { Form, Input, SearchIcon, ButtonSearch } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value } = this.state;
    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state.value;
    return (
      <header>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handleChange}
          />
          <ButtonSearch type="submit">
            <SearchIcon />
          </ButtonSearch>
        </Form>
      </header>
    );
  }
}
