"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askQuestion = async () => {
    if (!question.trim()) return;
    const q = question.trim();
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .chat-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #09090b;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;
          overflow: hidden;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .chat-icon-box {
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: #e8ff5a;
          background: rgba(232,255,90,0.05);
          flex-shrink: 0;
        }

        .chat-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #f0f0f0;
          margin: 0;
        }

        .chat-sub {
          font-size: 0.78rem;
          color: #6b6b74;
          margin: 2px 0 0;
        }

        .messages-scroll {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding-right: 4px;
          min-height: 0;
        }

        .messages-scroll::-webkit-scrollbar { width: 4px; }
        .messages-scroll::-webkit-scrollbar-track { background: transparent; }
        .messages-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 4px; }

        .empty-state {
          margin: auto;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          text-align: center; padding: 40px;
          color: #6b6b74;
        }

        .empty-circle {
          width: 64px; height: 64px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 8px;
        }

        .empty-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 600; color: #f0f0f0; margin: 0; }
        .empty-body  { font-size: 0.82rem; max-width: 260px; line-height: 1.6; margin: 0; }

        .msg-row {
          display: flex;
          gap: 12px;
          animation: cFadeUp 0.3s ease;
        }

        @keyframes cFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .msg-row.user { flex-direction: row-reverse; }

        .msg-avatar {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .msg-row.user .msg-avatar { background: rgba(232,255,90,0.12); color: #e8ff5a; }
        .msg-row.ai  .msg-avatar { background: rgba(90,255,232,0.10); color: #5affe8; }

        .msg-bubble { max-width: 72%; display: flex; flex-direction: column; gap: 4px; }
        .msg-row.user .msg-bubble { align-items: flex-end; }

        .msg-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #6b6b74;
        }

        .msg-row.user .msg-label { color: #e8ff5a; }

        .msg-text {
          font-size: 0.875rem;
          line-height: 1.65;
          padding: 12px 16px;
          border-radius: 12px;
          white-space: pre-wrap;
          margin: 0;
        }

        .msg-row.user .msg-text {
          background: #1c1c22;
          border: 1px solid rgba(255,255,255,0.07);
          border-top-right-radius: 4px;
          color: #f0f0f0;
        }

        .msg-row.ai .msg-text {
          background: #13131a;
          border: 1px solid rgba(255,255,255,0.07);
          border-top-left-radius: 4px;
          color: #f0f0f0;
        }

        .typing-dots {
          display: flex; gap: 5px; padding: 14px 18px;
          background: #13131a;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; border-top-left-radius: 4px;
        }

        .typing-dots span {
          width: 6px; height: 6px;
          background: #5affe8;
          border-radius: 50%;
          opacity: 0.4;
          animation: cdot 1.4s infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes cdot {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }

        .input-row {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          padding: 14px 16px;
          background: #111113;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          flex-shrink: 0;
        }

        .chat-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f0f0f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          line-height: 1.5;
          resize: none;
          max-height: 120px;
          overflow-y: auto;
        }

        .chat-textarea::placeholder { color: #6b6b74; }

        .send-btn {
          width: 38px; height: 38px;
          flex-shrink: 0;
          background: #e8ff5a;
          color: #09090b;
          border: none;
          border-radius: 9px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.2s, transform 0.15s;
        }

        .send-btn:hover:not(:disabled) { opacity: 0.85; transform: scale(1.05); }
        .send-btn:disabled { opacity: 0.25; cursor: not-allowed; }
      `}</style>

      <div className="chat-wrap">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="chat-title">Ask the Document</h2>
            <p className="chat-sub">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-scroll">
          {messages.length === 0 && (
            <div className="empty-state">
              <div className="empty-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <p className="empty-title">Nothing asked yet</p>
              <p className="empty-body">Upload a PDF and start asking questions about its content</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.role}`}>
              <div className="msg-avatar">
                {msg.role === "user" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                )}
              </div>
              <div className="msg-bubble">
                <span className="msg-label">{msg.role === "user" ? "You" : "AI"}</span>
                <p className="msg-text">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg-row ai">
              <div className="msg-avatar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className="msg-bubble">
                <span className="msg-label">AI</span>
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="input-row">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about the PDF…"
            rows={1}
            className="chat-textarea"
          />
          <button
            onClick={askQuestion}
            disabled={loading || !question.trim()}
            className="send-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}