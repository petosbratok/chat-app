import './main.css';
import './media.css';
import Chat from "./Chat.js"

import io from "socket.io-client";
import { useState } from "react";
const socket = io.connect("https://gentle-bayou-70074.herokuapp.com/");

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat
        ? (
          <div className="wrapper">
            <h3 className="title">Message.io</h3>
            <input className="input" type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}></input>
            <input className="input" type="text" placeholder="Room id" onChange={(event) => {setRoom(event.target.value)}}></input>
            <button className="button" onClick={joinRoom}><span>Start</span></button>
          </div>
        ) : (
          <div>
            <Chat socket={socket} username={username} room={room} />
          </div>
        )
      }
    </div>
  );
}

export default App;
