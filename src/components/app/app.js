import React, { Component } from 'react'; // Для преобразования jsx

/*
  Если Webpack видит, что импортируется папка
  './app-header
  То внутри этой папки он будет по дефолту искать index.js
  и если он существует, то он будет использовать его по умолчанию,
  тем самым можно не писать /app-header/app-header'
  Для этого необходимо создать файл index.js внутри папки компонента

  Было import AppHeader from './app-header/app-header';
*/

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

// () - для группировки jsx тегов
// Virtual DOM - Легковесные Объекты

/*
  1) Атрибуты, свойства (CamelCase c маленькой буквы, можно передать любое значение) -> props
  2) html в for -> в jsx htmlFor
  3) Если в свойстве не передать значение, то умолчанию оно true
     disabled эквивалентен disabled = {true}
*/

export default class App extends Component {
  // # Инициализация state + обработчиков без proposal-class-properties
  // constructor() {
  //   super();
  //   this.deleteItem = () => {
  //       console.log(`Done ${this.props.label}`)
  //   }
  //   this.state = {
  //     done: false,
  //   };
  // }

  // Генерация последовательного id начиная с 100 (можно мутировать)
  maxId = 100;

  // ! Нельзя изменять (мутировать) State напрямую, только читать
  state = {
    // Первоначальное состояние
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '', // Строка по которой будет проходить фильтрация (текст поиска),
    filter: 'all', // Кнопки фильтрации: all, active, done,
  };

  // # Функция по созданию нового TodoItem
  createTodoItem(label) {
    // Новый объект
    return {
      label, // label: label-> es5
      important: false,
      done: false,
      id: this.maxId++, // Он находиться не в state, его можно мутировать
    };
  }

  // # Функция по (умутабельному) переключению свойства у объекта в setState
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    // # Второй способ изменения объекта в массиве
    // const newArray = [...arr];
    // newArray[idx][propName] = !newArray[idx][propName];

    return [
      ...arr.slice(0, idx), // от 0 до вставляемого
      newItem, // вставляемый элемент
      ...arr.slice(idx + 1), // от вставляемого до конца
    ];
  }

  // # Функция по Поиска по значению term из state (ввод пользователя)
  searchTodo(todos, term) {
    if (term.length === 0) return todos;

    // Если содержит строку term в label TotoItem
    return todos.filter((todo) => {
      return todo.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  // # Функция по Фильтрации по значению filter из state (кнопки)
  filterTodo(todos, filter) {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((item) => !item.done); // невыполненные
      case 'done':
        return todos.filter((item) => item.done); // выполненные
      default:
        return todos;
    }
  }

  // # Обработчик, функция по добавлению элементов
  addItem = (text) => {
    // Новый объект
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      // Добавления в начало
      // const newTodoData = [newItem, ...todoData];

      // Добавления в конец
      const newTodoData = [...todoData, newItem];

      return {
        todoData: newTodoData,
      };
    });
  };

  // # Обработчик, функция по удалению элементов
  // Для того чтобы удалить React элемент необходимо удалить его из источника данных
  deleteItem = (id) => {
    // ! Нельзя мутировать state
    this.setState(({ todoData }) => {
      // state.todoData

      // # 1 Способ удаления элемента из массива
      const idx = todoData.findIndex((item) => item.id === id);
      const newTodoData = [
        ...todoData.slice(0, idx), // от 0 до удаляемого
        ...todoData.slice(idx + 1), // от удаленного до конца
      ];

      // # 2 Способ удаления элемента из массива
      // const newTodoData2 = todoData.filter((item) => item.id !== id);

      return {
        todoData: newTodoData,
      };
    });
  };

  // # Обработчик, функция переключения
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = this.toggleProperty(todoData, id, 'important');
      return {
        todoData: newTodoData,
      };
    });
  };

  // # Обработчик, функция переключения
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = this.toggleProperty(todoData, id, 'done');
      return {
        todoData: newTodoData,
      };
    });
  };

  // # Обработчик, функция обновления term в state при вводе (Поиска)
  onSearchChange = (term) => {
    this.setState({ term }); // term: term
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  // Функция отображения компонента
  render() {
    const { todoData, term, filter } = this.state;

    // Поиск элементов по term и последующая фильтрация по filter
    const visibleItems = this.filterTodo(this.searchTodo(todoData, term), filter);

    // Сколько элементов (выполнено) с done = true
    const doneCount = todoData.filter((todo) => todo.done).length;
    // Сколько всего осталось
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
