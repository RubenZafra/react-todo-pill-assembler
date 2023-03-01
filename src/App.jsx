import { useState } from 'react'
// custom hooks
import useLocalStorage from './hooks/useLocalStorage'

// custom components
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'
import ThemeSwitcher from './components/ThemeSwitcher'

// styles
import styles from './components/TaskList.module.css';
import stylesItem from './components/TaskItem.module.css';
import { FilterButtons } from './components/FilterButtons'


function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [mode, setMode] = useState('All')

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const showAll = () => {
    setMode('All')
    setFilteredTasks(tasks)
  }

  const showActive = (tasks) => {
    setMode('Active')
    const activeTasks = ([...tasks].filter(task => task.checked === false))
    setFilteredTasks(activeTasks);
  }

  const showComplete = (tasks) => {
    setMode('Complete')
    const deletedTasks = [...tasks].filter(task => task.checked === true)
    setFilteredTasks(deletedTasks)
  }

  const deleteComplete = (tasks) => {
    setMode('All')
    setTasks([...tasks].filter(task => task.checked === false))
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name }
        : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  return (
    <div className="container">
      <header>
        <h1>To-Do List Pill</h1>
      </header>
      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }
      <CustomForm addTask={addTask}/>
      <FilterButtons 
          showAll={showAll}
          mode={mode}
          showActive={showActive} 
          showComplete={showComplete} 
          deleteComplete={deleteComplete}
          tasks={tasks}
          />
      {!tasks.length == 0 ? (
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      ) : (
        <ul className={styles.tasks}>
          <li className={stylesItem.task}>
          <p className='no-tasks'>No tasks! You are FREE!! 😎</p>
          </li>
        </ul>
      ) 
      }
      <ThemeSwitcher /> 
    </div>
  )
}

export default App