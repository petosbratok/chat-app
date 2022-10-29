
import './main.css';
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat.js"
const socket = io.connect("http://localhost:3001");

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
          <div>
            <h3>Message.io</h3>
            <input type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}></input>
            <input type="text" placeholder="Room id" onChange={(event) => {setRoom(event.target.value)}}></input>
            <button onClick={joinRoom}>Start</button>
          </div>
        ) : (
          <div>
            <Chat socket={socket} username={username} room={room} />
          </div>
        )
      }

      }
    </div>
  );
}

export default App;
