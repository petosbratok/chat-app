const TheirMessage = ( lastMessage, message ) => {
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username
  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
          className="message-avatar"
          style={{backgroundImage: `url(${message?.sender?.avatar})`}}
        />
      )}
      { message?.attatchments?.length > 0
        ? (
          <img
          src={message.attatchments[0].file}
          alt="messages-attatchment"
          style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px'}}
          />
        ) : (
          <div className="message" style={{float: 'left', backgroundColor:'#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px'}}>
            {message.text}
          </div>
        )
      }

    </div>
  )
}

export default TheirMessage;
