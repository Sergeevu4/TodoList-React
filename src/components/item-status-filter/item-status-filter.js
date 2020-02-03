import React, { Component } from 'react';
import './item-status-filter.css';

/*
  В Компоненте ItemStatusFilter вынесли описание кнопок в отдельный массив, чтобы не дублировать.
  Текущая активная кнопка передается как свойство.
  Это продолжение идеи "Контролируемых компоненетов"
*/

export default class ItemStatusFilter extends Component {
  // У компонентов классов, доступ к props через this

  buttons = [
    // name - название фильтра, label - как выглядит кнопка
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button
          type='button'
          className={`btn ${isActive}`}
          key={name}
          // Отправляем значение нажатого name в App тем самым меняя filter в state App
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      );
    });

    return <div className='btn-group'>{buttons}</div>;
  }
}

// # Функциональный компонент
/* const ItemStatusFilterFunc = () => {
  return (
    <div className='btn-group'>
      <button type='button' className='btn btn-info'>
        All
      </button>
      <button type='button' className='btn btn-outline-secondary'>
        Active
      </button>
      <button type='button' className='btn btn-outline-secondary'>
        Done
      </button>
    </div>
  );
}; */
