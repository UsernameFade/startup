import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Input } from './input/input';
import { Story } from './story/story';
import { Login } from './login/login';



export default function App() {

  return      <BrowserRouter>  <header>

        <menu>

          <nav className="navbar navbar-default  ">
          
            <h1 className="navbar-brand">Storynook</h1>
            <li> <NavLink className='nav-link' to='home'>Back to Home </NavLink></li>
            <li> <NavLink className='nav-link' to='story'>Read the Adventure </NavLink></li>
            <li> <NavLink className='nav-link' to='login'>Add to the Adventure </NavLink></li>

            </nav>
        </menu>
    </header>

<Routes>

  <Route path='/' element={<Home />} exact />
  <Route path='/home' element={<Home />} />
  <Route path='/story' element={<Story />} />
  <Route path='/input' element={<Input />} />
  <Route path='/login' element={<Login />} />
  <Route path='*' element={<NotFound />} />
</Routes>
    <footer>
      <hr />
      <span className="text-reset">Author Name: McKay Price</span>
      <br />
      <a href="https://github.com/UsernameFade/startup">GitHub</a>
    </footer>

</BrowserRouter>  

}
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}