
import React, { useState, useContext } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { ProductsContext } from '../global/ProductContext';



const API_KEY = "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"

const ChatBot = () => {
  const { products } = useContext(ProductsContext);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Привіт, я чат-асистент на цьому сайті, чим я можу Вам допомогти?",
      sender: "ChatGPT"
    }
  ])

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setTyping(true);

    await processMessageToChatGPT(newMessages);
  }


  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });
  
    const systemMessage = {
      role: "system",
      content: "Відповідай на питання чітко та стисло ніби ти консультант-асистент в інтернет магазині для продажу електроніки. Не згадуй в тексті що тобі хтось надавав список. Запитуй яку категорію користувач бажає розгляну600 Ми маємо список таких продуктів:" + products.map((product) => product.productName)
    };
  
    const apiReguestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages]
    };
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiReguestBody)
    });
  
    const data = await response.json();
  
    const botMessage = data.choices[0].message.content;
  
    // Отримайте рекомендації товарів з масиву "products"
    const productRecommendations = getRecommendations(botMessage, products);
  
    setMessages([
      ...chatMessages,
      { message: botMessage, sender: "ChatGPT" },
      
    ]);
  
    setTyping(false);
  }
  function getRecommendations(message, products) {
    // Ключові слова категорій товарів
    const categoryKeywords = {
      laptops: ["ноутбук", "лаптоп", "лептоп"],
      phones: ["телефон", "смартфон"],
      consoles: ["приставка", "консоль"],
      monitors: ["монітор"],
    };
  
    // Пошук категорії товару за ключовими словами
    const matchedCategory = Object.entries(categoryKeywords).find(([category, keywords]) =>
      keywords.some(keyword => message.toLowerCase().includes(keyword))
    );
  
    // Повернення рекомендацій товарів за відповідною категорією або всіма товарами
    if (matchedCategory) {
      const [category, _] = matchedCategory;
      return products.filter(product => product.productCategory === category).map(product => product.productName);
    } else {
      return products.map(product => product.productName);
    }
  }

  return (
    <div className='chat-wrapper'>
      <div style={{ position: "relative", height: "600px", width: "500px" }}>
        <div className='chat-header'>
          <span>Чат-Асистент</span>
        </div>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator = {typing ? <TypingIndicator content="Чат-асистент пише" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder='Пишіть тут...' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>

      </div>
    </div>
    );
};

export default ChatBot;