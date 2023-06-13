import React, { useState } from 'react';
import ChatBot from './ChatBot';
import { BsFillChatFill } from "react-icons/bs";

const ChatButton = () => {
  const [chatBotVisible, setChatBotVisible] = useState(false);

  const handleToggleChatBot = () => {
    setChatBotVisible(!chatBotVisible);
  };

  return (
    <div className="chat-button-container">
      {/* Розмістіть ваш основний контент тут */}
      {/* Додайте невелику круглу кнопку */}
      <button className="chat-button" onClick={handleToggleChatBot}>
       <BsFillChatFill textAnchor='Chat'/>
      </button>

      {/* Відображайте компонент ChatBot, якщо chatBotVisible === true */}
      {chatBotVisible && <ChatBot />}
    </div>
  );
};

export default ChatButton;