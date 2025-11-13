import React from 'react';
import './input.css';


export function Input() {
  const [story, setStory] = React.useState('');
  const userName = localStorage.getItem('userName');
  const authState= localStorage.getItem('authState')
  const [prompt, setPrompt] = React.useState('');
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

    const handleStoryChange = (event) => {
        setStory(event.target.value);
    };
    const handleSubmit = async (event) => {
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

    </main>
 )}else{
  return (
        <main>
        <h2>Please Sign In To Access This Page</h2>

    </main>

  )
 }
}
  
