import React from "react";
import ChatBot from 'react-chatbotify'

const flow2 = {
    start: {
      message: "Hello there! What is your name?",
      path: "ask_choice"
    },
    ask_choice: {
      message: (params) => `Nice to meet you ${params.userInput}, How can I help you with?`,
      options: { items: ["Plumbing", "Electrician", "Carpenter"], min: 1, max: 1 },
      path: "final_message"
    },
    final_message: {
      message: "Do you have an account registered?",
      options: ["Yes", "No"],
      path: async (params) => {
        if (params.userInput === "Yes") {
          await params.injectMessage("Kindly login and search for the required worker");
        } else {
          await params.injectMessage("Kindly register if you don't have an account. Under the Helper section after login, click the start chat button to start communicating with the worker");
        }
        return "end";
      }
    },
    end: {
      message: "Thank you!",
      options: ["New Application"],
      chatDisabled: true,
      path: "start"
    }
  };

  
const BOT = () =>{
    return(
        <>
        <ChatBot flow={flow2}/>
        </>
    );
}

export default BOT;