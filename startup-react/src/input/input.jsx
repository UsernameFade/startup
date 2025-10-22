import React from 'react';
import './input.css';

export function Input() {
  const [story, setStory] = React.useState('');
  const userName = localStorage.getItem('userName');
  const authState= localStorage.getItem('authState')

    const handleStoryChange = (event) => {
        setStory(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(story);
        localStorage.setItem('storyData', story+ "\n" + localStorage.getItem('storyData'));
    };

    if(authState){
  return (

    <main>
        <h2>Add to the story here!</h2>
        <input type="text" id="storyInput" name="storyInput" onChange={(handleStoryChange)}></input>
        <input type="submit" value="Submit" onClick={(handleSubmit)}></input>

      <h3>Signed in as:</h3>
      <h3>{userName}</h3>

    </main>
 )}else{
  return (
        <main>
        <h2>Please Sign In To Access This Page</h2>

    </main>

  )
 }
}
  
