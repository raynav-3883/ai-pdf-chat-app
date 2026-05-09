"use client";

import { useState, useRef } from "react";

export default function PDFUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") return alert("Please select a PDF file");
    setFile(f);
    setMessage("");
  };

  const uploadPDF = async () => {
    if (!file) return alert("Select a PDF");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setMessage(data.message || "Uploaded successfully");
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .upload-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #111113;
          border-right: 1px solid rgba(255,255,255,0.07);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;
        }

        .upload-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .upload-icon-box {
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: #e8ff5a;
          background: rgba(232,255,90,0.05);
          flex-shrink: 0;
        }

        .upload-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #f0f0f0;
          margin: 0;
        }

        .upload-sub {
          font-size: 0.78rem;
          color: #6b6b74;
          margin: 2px 0 0;
        }

        .drop-zone {
          border: 1.5px dashed rgba(255,255,255,0.14);
          border-radius: 14px;
          padding: 36px 20px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255,255,255,0.01);
          flex: 1;
        }

        .drop-zone:hover, .drop-zone.drag-active {
          border-color: #e8ff5a;
          background: rgba(232,255,90,0.04);
        }

        .drop-zone.has-file {
          border-style: solid;
          border-color: #5affe8;
          background: rgba(90,255,232,0.04);
        }

        .drop-prompt {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          text-align: center;
        }

        .drop-icon-svg { color: #6b6b74; margin-bottom: 4px; }
        .drop-text { font-size: 0.9rem; font-weight: 500; color: #f0f0f0; }
        .drop-sub  { font-size: 0.78rem; color: #6b6b74; }

        .file-selected {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          text-align: center;
        }

        .file-icon-svg { color: #5affe8; }
        .file-name { font-size: 0.85rem; font-weight: 500; color: #f0f0f0; max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .file-size { font-size: 0.75rem; color: #6b6b74; }

        .upload-btn {
          width: 100%;
          padding: 13px;
          border-radius: 14px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #e8ff5a;
          color: #09090b;
          transition: opacity 0.2s, transform 0.15s;
        }

        .upload-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .upload-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .upload-btn.loading { background: rgba(255,255,255,0.07); color: #6b6b74; }

        .u-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: #f0f0f0;
          border-radius: 50%;
          animation: uspin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes uspin { to { transform: rotate(360deg); } }

        .success-msg {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8rem;
          color: #5affe8;
          background: rgba(90,255,232,0.08);
          border: 1px solid rgba(90,255,232,0.18);
          padding: 10px 14px;
          border-radius: 8px;
        }
      `}</style>

      <div className="upload-wrap">
        {/* Header */}
        <div className="upload-header">
          <div className="upload-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <div>
            <h2 className="upload-title">Upload Document</h2>
            <p className="upload-sub">PDF files only</p>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          className={`drop-zone ${dragOver ? "drag-active" : ""} ${file ? "has-file" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
          {file ? (
            <div className="file-selected">
              <div className="file-icon-svg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span className="file-name">{file.name}</span>
              <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
            </div>
          ) : (
            <div className="drop-prompt">
              <div className="drop-icon-svg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>
              </div>
              <p className="drop-text">Drop your PDF here</p>
              <p className="drop-sub">or click to browse</p>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={uploadPDF}
          disabled={loading || !file}
          className={`upload-btn ${loading ? "loading" : ""}`}
        >
          {loading ? (
            <><span className="u-spinner" />Processing…</>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Upload & Index
            </>
          )}
        </button>

        {/* Success */}
        {message && (
          <div className="success-msg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {message}
          </div>
        )}
      </div>
    </>
  );
}