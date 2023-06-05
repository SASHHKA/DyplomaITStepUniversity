import React, { Component } from "react";


export class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 1,
          question: "Яке використання буде мати товар?"
        },
        {
          id: 2,
          question: "Яка цінова категорія вас цікавить?"
        },
        {
          id: 3,
          question: "Який розмір екрану ви бажаєте?"
        },
        {
          id: 4,
          question: "Якому бренду ви більше довіряєте?"
        },
        {
          id: 5,
          question: "Якому процессору ви довіряєте?"
        },
        {
          id: 6,
          question: "Який вигляд товару вам більше до вподоби (наприклад, класичний або сучасний)?"
        },
        {
          id: 7,
          question: "Яку кольорову гаму ви бажаєте?"
        }
      ],
    }
  }
  render() {
    
    return (
      <div className="bot-wrapper">
        <div className="bot-header">
          <span>Чат бот</span>
        </div>
        <div className="bot-messages">
          <span>Доброго дня мене звуть Какашка, чим я можу вам допомогти?</span>
          <div></div>
        </div>
        <div className="bot-input">
          <button className="option-one">
            <div></div>
          </button>
          <button className="option-two">option</button>
        </div>
      </div>
    );
  }

  
}

export default ChatBot;
