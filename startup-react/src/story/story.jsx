import React from 'react';
import './story.css';

export function Story() {
    const [story, setStory] = React.useState('Loading...');
    React.useEffect(() => {
      setStory(`Websocket+Database placerholder:`);
        }, []);
  return (
<main>

        <h2>The Story so far:</h2>
  
    
        <h3>{story}</h3>
    </main>

  );
}