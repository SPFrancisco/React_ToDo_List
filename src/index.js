import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const TASK = [
  { id: "todo-0", name: "Estudiar", completed: true },
  { id: "todo-1", name: "Comer", completed: false },
  { id: "todo-2", name: "Dormir", completed: false }
];

ReactDOM.render(<App tasks={TASK} />, document.getElementById("root"));
