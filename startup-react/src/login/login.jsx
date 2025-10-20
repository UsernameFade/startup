import React, { createRef } from 'react';
import './login.css';

export function Login() {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function loginUser() {
    localStorage.setItem('userName', userName);
    localStorage.setItem('password', password);
    
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    localStorage.setItem('password', password);
    
  }
  return (
    
    <main>
        <form method="get" action="Input">
        <div >
          <input className="form-control" type="text" placeholder="your@email.com" onChange={(e) => setUserName(e.target.value)}/>
        </div>
        <div >
          <input type="password" className="form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)}  />
        </div>
        <button type="submit" className="btn btn-outline-dark" disabled={!userName || !password} onClick={loginUser} >Login</button>
        <button type="submit" className="btn btn-outline-dark" onClick={createUser} disabled={!userName || !password}>Create</button>
      </form>


    </main>

  );
}