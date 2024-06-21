import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { BsCoin } from "react-icons/bs";
import { GrIntegration } from "react-icons/gr";



import './App.css';

function App() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [todo, setTodo] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem('todo'));
    if (store) {
      setTodo(store);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);

  const onSubmit = (data) => {
    const newTask = {
      id: Date.now(),
      task: data.task.trim(),
      firstdate: data.firstdate,
      secdate: data.secdate,
      completed: false,
    };
    setTodo([...todo, newTask]);
    setShowForm(false);
    reset();
  };

  const handleCheckboxChange = (id) => {
    const updatedTasks = todo.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTodo(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = todo.filter(task => task.id !== id);
    setTodo(updatedTasks);
  };

  const filteredTasks = todo.filter(task =>
    task.task.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="container">

        <div className="leftflex">
          <div className="introduce">
          <CgProfile className='profile'/>
          <p className='welcome'>Welcome Zion,</p>
          </div>

          <div className="links">
            <a href="#" className='link'>
               <FaRegFaceSmileWink className='smile'/> <span className="text">Welcome</span> 
            </a>

            <a href="#" className='link'>
               <MdDashboard className='smile'/> <span className="text">Dashboard</span>
            </a>

            <a href="#" className='tasklink'>
               <FaTasks className='smile'/> <span className="text">Tasks</span>
            </a>

            <a href="#" className='link'>
               <IoPeopleOutline className='smile'/> <span className="text">People</span>
            </a>

            <a href="#" className='link'>
               <VscGraph className='smile'/> <span className="text">Reports</span>
            </a>

            <a href="#" className='link'>
               <BsCoin className='smile'/> <span className="text">Billing</span>
            </a>

            <a href="#" className='link'>
               <GrIntegration className='smile'/> <span className="text">Integration</span>
            </a>
          </div>
          
        </div>
        <div className="rightflex">
        <h1 className='head'>To-Do List</h1>
        <div className="header">

          <div className="formdiv">
          <button onClick={() => setShowForm(!showForm)} className="toggle-form">
            <FaPlus /> NEW TASK
          </button>
          {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="task-form">
            <div className="eachdiv">
            <input
              type="text"
              placeholder="Enter new task"
              {...register('task', { required: true })}
            />
            {errors.task && <p className="error">*</p>}
            </div>
            <div className="eachdiv">
            <input
              type="date"
              placeholder="Enter start date"
              {...register('firstdate', { required: true })}
            />
            {errors.firstdate && <p className="error">*</p>}
            </div>
            

            <div className="eachdiv">
            <input
              type="date"
              placeholder="Enter deadline date"
              {...register('secdate', { required: true })}
            />
            {errors.secdate && <p className="error">*</p>}
            </div>
           
            <button type="submit" className='add'>Add Task</button>
          </form>
        )}

          </div>
         
          <div className="searchdiv">
          <button onClick={() => setShowSearch(!showSearch)} className="toggle-search">
            <FaSearch /> FIND TASK
          </button>
          {showSearch && (
          <input
            type="search"
            placeholder="Search tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        )}
         
          </div>
          
        </div>
       
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="maintask">
              <input
                type="checkbox"
                id={`checkbox-${task.id}`}
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
                className="task-checkbox"
              />
              <label htmlFor={`checkbox-${task.id}`} className="custom-checkbox-label"></label>
              
              <div className="idkdiv">
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.task}</span>
              <div className="task-dates">
                <p className='start'>Start Date: <br></br> <span className='maindate'>{task.firstdate}</span></p>
                <p className='end'>Deadline: <br></br><span className='maindate'>{task.secdate}</span></p>
              </div>
              </div>
              </div>
              
              <button onClick={() => deleteTask(task.id)} className="delete-button">
                DELETE
              </button>
            </div>
          ))}
        </div>
        </div>
        
      </div>
    </>
  );
}

export default App;