import React, { useState, useEffect } from "react"

function Chat({socket, username, room}) {
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours()
              + ":"
              +  new Date(Date.now()).getMinutes(),
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
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return <p>{messageContent.message}</p>
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type here..."
          onChange={(event) => {
            setCurrentMessage(event.target.value)
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat
