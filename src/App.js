import { ChatEngine } from 'react-chat-engine'

import ChatFeed from './components/ChatFeed'

import './App.css'

const App = () => {
  return (
    <ChatEngine
      height="100vh"
      projectID="e83822a7-8ebb-4000-843a-b50e1beea4e6"
      userName="test_user1"
      userSecret="123"
      renderChatFeed={(chatAppProps) => <ChatFeed {... chatAppProps} />}
    />
  )
}

export default App;
