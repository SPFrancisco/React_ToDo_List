import React, { useState } from "react";
import { nanoid } from "nanoid";
import './App.css';
import ToDo from './components/ToDo';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  Todas: () => true,
  Activas: task => !task.completed,
  Completadas: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  const [filter, setFilter] = useState('Todas');
  
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <ToDo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask} />
    )
  );

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name}
    isPressed={name === filter}
    setFilter={setFilter} />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tareas' : 'tarea';
  const headingText = `${taskList.length} ${tasksNoun}`;

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  };

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  };

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  };
  
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
