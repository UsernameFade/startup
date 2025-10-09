import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
        <form method="get" action="Input">
        <div >
          <input className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div >
          <input type="password" className="form-control" placeholder="password" />
        </div>
        <button type="submit" className="btn btn-outline-dark">Login</button>
        <button type="submit" className="btn btn-outline-dark" >Create</button>
      </form>
    </main>
  );
}