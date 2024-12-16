import React from 'react';
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element = {<Register/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/dashboard" element = {<Dashboard/>}/>
      <Route path = "/tasklist" element = {<TaskList/>}/>
    </Routes>
    </>
  )
}

export default App;