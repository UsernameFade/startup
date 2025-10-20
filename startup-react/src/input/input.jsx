import React from 'react';
import './input.css';

export function Input() {
  const [story, setStory] = React.useState('');
  
    const handleStoryChange = (event) => {
        setStory(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(story);
        localStorage.setItem('storyData', story);
    };

  return (

    <main>
        <h2>Add to the story here!</h2>
        <input type="text" id="storyInput" name="storyInput" onChange={(handleStoryChange)}></input>
        <input type="submit" value="Submit" onClick={(handleSubmit)}></input>

        <p>{story}</p>


    </main>

        

  );
}