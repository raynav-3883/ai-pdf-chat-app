"use client";

import { useState } from "react";

export default function PDFUpload() {

  // Store selected PDF file
  const [file, setFile] =
    useState<File | null>(null);

  // Upload function
  const uploadPDF = async () => {

    // If no file selected
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    // Create form data
    const formData = new FormData();

    // Append PDF file
    formData.append("pdf", file);

    // Send file to backend API
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    alert(data.message);
  };

  return (

    <div className="mb-10">

      {/* File Input */}
      <input
        type="file"
        accept=".pdf"

        onChange={(e) => {

          // Save selected file
          if (e.target.files) {
            setFile(e.target.files[0]);
          }

        }}
      />

      {/* Upload Button */}
      <button
        onClick={uploadPDF}

      className="bg-black text-white px-4 py-2 rounded ml-4"
      >
        Upload PDF
      </button>

    </div>
  );
}