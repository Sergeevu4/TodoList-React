import React from 'react'; // Для преобразования jsx
import ReactDOM from 'react-dom';
// Основной компонент
import App from './components/app';

// * React - элемент <h1>Hello, world</h1> (то, «из чего сделаны» компоненты)
// * React - компонент const HelloWorld = () => <h1>Hello, world</h1>;

// Первый параметр: React - <App /> элемент, а не React - (функция) компонент App
ReactDOM.render(<App />, document.querySelector('#root'));
