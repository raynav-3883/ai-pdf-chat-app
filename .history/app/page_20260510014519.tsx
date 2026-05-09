"use client";

import PDFUpload from "@/components/PDFUpload";
import ChatBox from "@/components/ChatBox";

export default function Page() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #09090b;
          min-height: 100vh;
        }

        /* ── Header ── */
        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(9,9,11,0.9);
          backdrop-filter: blur(16px);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.02em;
          color: #f0f0f0;
          text-decoration: none;
        }

        .logo-mark {
          width: 30px; height: 30px;
          background: #e8ff5a;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          color: #09090b;
        }

        .logo span { color: #e8ff5a; }

        .header-pill {
          font-size: 0.7rem;
          font-weight: 500;
          color: #6b6b74;
          border: 1px solid rgba(255,255,255,0.07);
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Two-column layout ── */
        .split-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          height: calc(100vh - 69px);
        }

        /* ── Left: Upload ── */
        .left-col {
          border-right: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          height: 100%;
        }

        /* ── Right: Chat ── */
        .right-col {
          overflow: hidden;
          height: 100%;
        }

        @media (max-width: 768px) {
          .split-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
          .left-col {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            height: auto;
            min-height: 400px;
          }
          .right-col {
            height: 520px;
          }
          .app-header { padding: 16px 20px; }
        }
      `}</style>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <div className="logo-mark">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          pdf<span>chat</span>
        </div>
        <span className="header-pill">AI Powered</span>
      </header>

      {/* Split Layout */}
      <div className="split-layout">
        <div className="left-col">
          <PDFUpload />
        </div>
        <div className="right-col">
          <ChatBox />
        </div>
      </div>
    </>
  );
}