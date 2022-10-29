import React, { useContext } from 'react'

import { ChatEngineContext, getLatestMessages } from 'react-chat-engine'

const ChatList = (props) => {
  const { conn, activeChat, setActiveChat, } = useContext(ChatEngineContext)

  const chooseChat = (chat_id) => {
    setActiveChat(chat_id)
    console.log(props)
  }

  const renderChats = () => {
    const chats = props.chats
    console.log('chats', chats)
    if (chats) {
      return (
        <div className="chat-list">
          {
            Object.keys(chats).map((chat_id, chat_count) => (
              <div
                  className="chat-info"
                  onClick={() => chooseChat(chat_id)}
                  className={`ce-chat-card ${activeChat === props.Activechat && 'ce-active-chat-card'}`}>
                <p className="chat-title">{chats[chat_id].title}</p>
                <p className="chat-subtitle">{chats[chat_id].last_message.text}</p>
              </div>
            ))
          }
        </div>
      )
    }
  }



  console.log('there:', props.chats)
  return(
    <div className="chats-panel">
      {renderChats()}
    </div>

  )
}

export default ChatList
