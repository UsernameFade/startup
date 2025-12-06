import React, { useEffect } from 'react';
import './input.css';
import { StoryNotifier } from './storyNotifier';


export function Input() {
  const [story, setStory] = React.useState('');
  const userName = localStorage.getItem('userName');
  const authState= localStorage.getItem('authState')
  const [prompt, setPrompt] = React.useState('');
  const [lastUpdate, setLastUpdate] = React.useState("No new updates");
  

if(localStorage.getItem('storyData') === null){
          localStorage.setItem('storyData', "");
        }
      

  async function storyUpdate(story) {
    const storyJSON = { "msg": story };

    await fetch('/api/story', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(storyJSON),
    });
  }
  React.useEffect(() => {
  function handleStoryEvent(event) {
    console.log("Success1");
    console.log(event);
    setLastUpdate("Last change to the story was: "+ event.story + " By user: " +event.name);
  }
  StoryNotifier.setHandler(handleStoryEvent);
}, []);

    const handleStoryChange = (event) => {
        setStory(event.target.value);
    };
    const handleSubmit = async (event) => {
        StoryNotifier.sendMessage(story, userName);
        event.preventDefault();
        console.log(story);


        if(localStorage.getItem('storyData') === null){
          localStorage.setItem('storyData', "");
        }
        

        localStorage.setItem('storyData', story+ "\n" + localStorage.getItem('storyData'));
        storyUpdate(story);
        
    };






    if(true){
      React.useEffect(() => {

        fetch('https://api.adviceslip.com/advice')
    .then((response) => response.json())
    .then((json) => {
      setPrompt(json.slip.advice);
    })
    .catch();
      }, []);




  return (

    <main>
        <h2>Add to the story here!</h2>
        <input type="text" id="storyInput" name="storyInput" onChange={(handleStoryChange)}></input>
        <input type="submit" value="Submit" onClick={(handleSubmit)}></input>
      <h3>Advice: {prompt}</h3>
      <h3>Signed in as:</h3>
      <h3>{userName}</h3>
      <h3>{lastUpdate}</h3>

    </main>
 )}else{
  return (
        <main>
        <h2>Please Sign In To Access This Page</h2>

    </main>

  )
 }
}
  
