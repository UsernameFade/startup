class StoryNotifier {
  observers = [];
  connected = false;
 handler = () => {};


  constructor() {
    // Adjust the webSocket protocol to what is being used for HTTP
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    //this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    // Display that we have opened the webSocket
    this.socket.onopen = (event) => {
      this.notifyObservers('system', 'websocket', 'connected');
      this.connected = true;
    };



    // If the webSocket is closed then disable the interface
    this.socket.onclose = (event) => {
      this.notifyObservers('system', 'websocket', 'disconnected');
      this.connected = false;
    };

    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
    

  }

  receiveEvent(event){
    this.handler(event);
  }

  sendMessage(story, name) {
    this.socket.send(JSON.stringify({ "name":name, "story": story }));
  }

  setHandler(handler) {
    
    this.handler = (handler);
  }

    addHandler(handler) {
    this.handlers.push(handler);
  }
  removeHandler(handler) {
    this.handlers = () => {};
  }



  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, from, msg) {
    this.observers.forEach((h) => h({ event, from, msg }));
  }
}








const storyNotifier = new StoryNotifier();

export { storyNotifier as StoryNotifier };