import React from 'react';
import './input.css';

export function Input() {
  return (

    <main>
        <h2>Add to the story here!</h2>
        <input type="text" id="storyInput" name="storyInput"></input>
        <input type="submit" value="Submit"></input>

        <p>Placeholder for writing prompt web service</p>
    </main>



  );
}