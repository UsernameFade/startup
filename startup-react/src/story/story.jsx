import React from 'react';
import './story.css';

export function Story() {




      const storyTest = localStorage.getItem('storyData');
    const [story, setStory] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/story')
      .then((response) => response.json())
      .then((story) => {
        setStory(story.msg);
      });
  }, []);

  return (
    
<main>

        <h2>The Story so far:</h2>
  
    
        <h3>{story} </h3>



    </main>

  );
}