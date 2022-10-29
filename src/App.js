import { ChatEngine } from 'react-chat-engine'

import ChatFeed from './components/ChatFeed'
import LoginForm from './components/LoginForm'
import ChatList from './components/ChatList';

import './App.css'

const App = () => {
  if (!localStorage.getItem('username')) return <LoginForm />

  return (
    <ChatEngine
      height="100vh"
      projectID="e83822a7-8ebb-4000-843a-b50e1beea4e6"
      userName= {localStorage.getItem('username')}
      userSecret= {localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {... chatAppProps} />}
      renderChatList={(chatAppProps) => <ChatList {... chatAppProps} />}
    />
  )
}

export default App;
