import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

// Имя компонента обязательно с Заглавной буквы
const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  /*
    ! Если имена свойств компонента совпадает с именами свойств объекта который передается
    label={item.label} important={item.important}

    То при помощи Spread для объекта, можно переделать код выше на {...item}
    Взять каждое свойства из объекта item и передать его в качестве атрибута, со значением в TodoListItem
  */

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className='list-group-item'>
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className='list-group todo-list'>{elements}</ul>;
};

export default TodoList;
