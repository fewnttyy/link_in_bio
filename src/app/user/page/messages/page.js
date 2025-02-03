'use client'
import { useState } from 'react'
import styles from '../../styles/Messages.module.css'

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Baralynk.id',
      content: 'Hello there from sunny Sydney! Need help? Reach out to us right here, and we\'ll get back to you as soon as we can!',
      timestamp: '2 hours ago',
      isUser: false
    },
    {
      id: 2,
      sender: 'User',
      content: 'hello',
      timestamp: '2 hours ago',
      isUser: true
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'User',
        content: message,
        timestamp: 'Just now',
        isUser: true
      }]);
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>
        {/* <button className={styles.backButton}>←</button> */}
        <div className={styles.headerInfo}>
          <h1>Messages</h1>
          <p>Typically replies within few hours</p>
        </div>
      </div>
      
      <div className={styles.messageContainer}>
        {messages.map((msg) => (
          <div key={msg.id} className={`${styles.messageWrapper} ${msg.isUser ? styles.userMessage : styles.botMessage}`}>
            {!msg.isUser && <div className={styles.avatar}>B</div>}
            <div className={styles.message}>
              {!msg.isUser && <div className={styles.senderName}>{msg.sender}</div>}
              <div className={styles.messageContent}>
                {msg.content}
              </div>
              <div className={styles.timestamp}>{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Reply here..."
          className={styles.input}
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
        {/* <button type="button" className={styles.emojiButton}>
          😊
        </button> */}
      </form>
    </div>
  );
}