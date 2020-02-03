import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
  state = {
    label: '',
  };

  // # Обрработчик, функция получения value из input
  onLabelChange = (evt) => {
    const { value } = evt.target;
    this.setState({
      label: value,
    });
  };

  // # Обработчик, отправки формы
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onAdd(this.state.label);

    // Обнуляет состояние и input.value
    this.setState({
      label: '',
    });
  };

  /*
    # Неконтролируемый компонент:
    Когда нету связи между внутренним state и элементом input, и если изменить
    state, input не измениться, так как компонент не узнает об изменениях. Хотя в данной модели источником истины является input.
    Получается без связи есть два состояния, state и input.values

    # Контролируемым компонент:
    Для того чтобы сделать контролируемый компонент и связать input и state
    Необходимо сделать, что значение элемента устанавливалось из состояние компонента
    value={this.state.value}
  */

  render() {
    return (
      <form className='item-add-form ' onSubmit={this.onSubmit}>
        <input
          type='text'
          placeholder='What needs to be done'
          className='form-control'
          value={this.state.label}
          onChange={this.onLabelChange}
        />
        <button className='btn btn-outline-secondary'>add item</button>
      </form>
    );
  }
}
