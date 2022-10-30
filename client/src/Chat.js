import React, { useState, useEffect } from "react"

function Chat({socket, username, room}) {
  var colors = [
    ["242325", "DC965A"], ["242325", "BBB891"], ["F1F7ED", "54494B"],
    ["F1F7ED", "B33951"], ["54494B", "E3D081"], ["4A5859", "F4D6CC"],
    ["EDFFEC", "5A5766"], ["EDDDD4", "283D3B"], ["EDDDD4", "C44536"],
    ["420039", "A9A587"], ["271F30", "A1CDF1"]
  ]

  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(messageList)

    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours()
              + ":"
              +  new Date(Date.now()).getMinutes()
      };

      await socket.emit("send_message", messageData)
      setMessageList((list) => [...list, messageData])
      setCurrentMessage("")
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  return (
    <div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          let color = colors[Math.floor(Math.random()*colors.length)]
          return (
            <div
              className="message"
              style={{
                color: "#" + color[0],
                background: "#" + color[1]

              }}
              >
              <p className="text">{messageContent.message}</p>
              <div className="meta">
                <span className="author">{messageContent.author}</span> at <span className="time">{messageContent.time}</span>
              </div>
            </div>
          )
        })}
      </div>
      <form onSubmit={sendMessage} className="chat-footer">
        <input
          type="text"
          className="input"
          value={currentMessage}
          placeholder="Type here..."
          onChange={(event) => {
            setCurrentMessage(event.target.value)
          }}
        />
      <button className="button" type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat
