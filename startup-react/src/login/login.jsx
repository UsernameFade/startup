import React, { createRef } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';



export function Login() {

  const navigate = useNavigate();

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function loginUser() {
    console.log("Fetch Test");



    localStorage.setItem('userName', userName);
    localStorage.setItem('password', password);
    localStorage.setItem('authState', 'true');

  }

  async function createUser() {
    
    
    localStorage.setItem('userName', userName);
    localStorage.setItem('password', password);
    localStorage.setItem('authState', true);
    const response = await fetch(`/api/auth/create`, {
    method: 'post',
    body: JSON.stringify({ "email": userName, "password": password }),
        headers: {'Content-type': 'application/json'},
    });
    navigate('/input');
  }
    async function logoutUser() {
    localStorage.setItem('userName', '');
    localStorage.setItem('password', '');
    localStorage.setItem('authState', false);
    fetch('/api/auth/logout', {
      method: 'delete',
    })
      .catch(() => {

      })
      navigate('/home');
  }
  return (
    
    <main>
        <form method="get">
        <div >
          <input className="form-control" type="text" placeholder="your@email.com" onChange={(e) => setUserName(e.target.value)}/>
        </div>
        <div >
          <input type="password" className="form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)}  />
        </div>
        <button type="button" className="btn btn-outline-dark"  disabled={!userName || !password} onClick={loginUser} >Login</button>
        <button type="button" className="btn btn-outline-dark"   onClick={createUser} disabled={!userName || !password}>Create</button>
        
      </form>
      <form method="get"><button type="button" className="btn btn-dark" onClick={logoutUser} >Log Out</button></form>
  

    </main>

  );
}