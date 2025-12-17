import React, { useState } from "react";
import styles from "./ChatWidget.module.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const newMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, newMessage]);
    setQuery("");
    setLoading(true);

    const formData = new FormData();
    formData.append("query", newMessage.text);

    // const res = await fetch("https://ai-book-backend-4f6e.onrender.com/chat", {
    const res = await fetch("https://ahmednoorani258-rag-book.hf.space/chat", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: data.answer || "No response" },
    ]);

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className={styles.chatButton} onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <strong>AI Book Assistant</strong>
            <span onClick={() => setOpen(false)} className={styles.closeBtn}>✖</span>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.sender === "user" ? styles.userMsg : styles.botMsg}
              >
                {msg.text}
              </div>
            ))}

            {loading && <div className={styles.botMsg}>Typing...</div>}
          </div>

          <div className={styles.inputArea}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
