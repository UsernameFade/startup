import React from 'react';
import './input.css';

export function Input() {
  const [prompt, setPrompt] = React.useState('Loading...');
  React.useEffect(() => {
    setPrompt(`Placeholder for writing prompt web service`);
  }, []);

  return (

    <main>
        <h2>Add to the story here!</h2>
        <input type="text" id="storyInput" name="storyInput"></input>
        <input type="submit" value="Submit" onclick="submitText"></input>

        <p>{prompt}</p>
    </main>



  );
}