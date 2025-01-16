import React from 'react'
import CharHeader from './components/chat-header'
import MessageContainer from './components/message-container'
import MessageBar from './components/message-bar'

const ChatContainer = () => {
  return (
    <div className='fixed top-0 right-0 h-[100vh] md:w-[65vw] lg:w-[70vw] xl:w-[80vw] sm:w-[0] bg-[#1c1d25] flex flex-col'>
        <CharHeader/>
        <MessageContainer/>
       <MessageBar/>
    </div>
  )
}

export default ChatContainer