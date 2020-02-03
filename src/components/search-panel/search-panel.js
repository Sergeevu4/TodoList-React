import React, { Component } from 'react';
import './search-panel.css';

/*
  Компонент SearchPanel генерирует событие
  this.onSearchChange на каждое нажатие клавиши
  чтобы App обновлял список
*/

export default class SearchPanel extends Component {
  state = {
    term: '',
  };

  // # Обработчик передачи ввода value в App
  onSearchChange = (evt) => {
    const term = evt.target.value;
    this.setState({ term }); // term: term

    this.props.onSearchChange(term);
  };

  // # Второй метод
  // onSearchChange = (evt) => {
  //   const { value } = evt.target;
  //   this.setState({ term: value }, () => {
  //     this.props.onSearchChange(this.state.term);
  //   });
  // };

  render() {
    return (
      <input
        className='form-control search-input'
        type='text'
        placeholder='type to search'
        // Контролируемый компонент
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    );
  }
}
