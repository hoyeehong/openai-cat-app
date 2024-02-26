import React, { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    setMessages([{ user: true, text: input }, ...messages]);
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_API, {
        query: input,
      });
      setMessages([{ user: false, text: response.data.reply }, ...messages]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setInput("");
  };

  return (
    <>
      <input
        style={{ width: "50%" }}
        type="text"
        value={input}
        placeholder="Message Cat Chatbot..."
        onChange={(e) => setInput(DOMPurify.sanitize(e.target.value))}
      />
      <button onClick={handleSendMessage} width="800%">
        Send
      </button>

      {messages.map((message, index) => (
        <div key={index} style={{ textAlign: message.user ? "right" : "left" }}>
          {message.text.includes("https") ? (
            <img src={message.text} width="30%" alt="" />
          ) : (
            message.text
          )}
        </div>
      ))}
    </>
  );
}

export default App;
