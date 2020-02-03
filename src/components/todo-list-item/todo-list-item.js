import React from 'react';
import './todo-list-item.css';

const TodoListItem = ({ label, onDeleted, onToggleImportant, onToggleDone, done, important }) => {
  let classNames = 'todo-list-item';

  // Алгоритм reconciliation React сравнит состояние компонента до и после, и отрендарит только новый класс в DOM
  if (done) {
    classNames += ' done';
  }

  if (important) {
    classNames += ' important';
  }

  return (
    <div className={classNames}>
      <span className='todo-list-item-label' onClick={onToggleDone}>
        {label}
      </span>

      <div className='todo-list-item-btn'>
        <button
          type='button'
          className='btn btn-outline-success btn-sm float-right'
          onClick={onToggleImportant}
        >
          <i className='fa fa-exclamation' />
        </button>

        <button
          type='button'
          className='btn btn-outline-danger btn-sm float-right'
          onClick={onDeleted}
        >
          <i className='fa fa-trash-o' />
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;

// # Компонент Class
// class TodoListItem extends Component {
//   // ! Нельзя изменять State напрямую, только читать
//   state = {
//     done: false,
//     important: false,
//   };

//   // # Обработчик события
//   onLabelClick = () => {
//     /*
//       ! setState
//       1) Устанавливает состояние, если состояние изменилось, необходим перерендарить компонент
//       То есть заново запустить функцию render в react
//       Переданный объект через setState наложиться поверх предыдущего state

//       2) this.setState асинхронная функция - поэтому такой код this.state.done
//       может работать не всегда правильно, так как нельзя рассчитывать,
//       что текущий state в самом свежем состоянии.
//       Для того чтобы быть точно уверен, что state находиться в финальном состоянии
//       и его можно использовать, для того чтобы вычислить новый state
//       необходимо использовать функцию внутри this.setState((state - текущий) => {}

//     */

//     // # Небезопасный вариант установки состояния
//     // Использовать когда состояния не зависит от предыдущего состояния
//     this.setState({
//       done: !this.state.done,
//     });
//   };

//   // # Обработчик события
//   onMarkImportant = () => {
//     // # Безопасный вариант установки состояния
//     this.setState(({ important }) => {
//       return {
//         important: !important,
//       };
//     });
//   };

//   // # Функция отображения компонента
//   render() {
//     // У компонентов классов, доступ к props через This
//     const { label, onDeleted } = this.props;
//     const { done, important } = this.state;
//     let classNames = 'todo-list-item';

//     // Алгоритм reconciliation React сравнит состояние компонента до и после, и отрендарит только новый класс в DOM
//     if (done) {
//       classNames += ' done';
//     }

//     if (important) {
//       classNames += ' important';
//     }

//     return (
//       <div className={classNames}>
//         <span className='todo-list-item-label' onClick={this.onLabelClick}>
//           {label}
//         </span>

//         <button
//           type='button'
//           className='btn btn-outline-success btn-sm float-right'
//           onClick={this.onMarkImportant}
//         >
//           <i className='fa fa-exclamation' />
//         </button>

//         <button type='button' className='btn btn-outline-danger btn-sm float-right' onClick={onDeleted}>
//           <i className='fa fa-trash-o' />
//         </button>
//       </div>
//     );
//   }
// }

// # Функциональный компонент
/* const TodoListItemFunc = ({ label, important = false }) => {
  const spanStyle = {
    color: important ? 'steelblue' : 'black',
    fontWeight: important ? 'bold' : 'normal',
  };

  return (
    <div className='todo-list-item'>
      <span className='todo-list-item' style={spanStyle}>
        {label}
      </span>

      <button type='button' className='btn btn-outline-success btn-sm float-right'>
        <i className='fa fa-exclamation' />
      </button>

      <button type='button' className='btn btn-outline-danger btn-sm float-right'>
        <i className='fa fa-trash-o' />
      </button>
    </div>
  );
}; */
