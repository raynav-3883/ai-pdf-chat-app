"use client";

import { useState }
from "react";

export default function PDFUpload() {

  // Store selected file
  const [file, setFile] =
    useState<File | null>(null);

  // Loading state
  const [loading, setLoading] =
    useState(false);

  // Success message
  const [message, setMessage] =
    useState("");

  // Upload PDF
  const uploadPDF = async () => {

    try {

      // No file selected
      if (!file) {

        alert("Select a PDF");

        return;

      }

      setLoading(true);

      // Create form data
      const formData =
        new FormData();

      formData.append(
        "pdf",
        file
      );

      // Send PDF to backend
      const res =
        await fetch(

          "/api/upload",

          {

            method: "POST",

            body: formData,

          }

        );

      const data =
        await res.json();

      // Show success message
      setMessage(
        data.message
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Upload failed");

    }

  };

  return (

    <div className="border p-6 rounded">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Upload PDF
      </h2>

      {/* File Input */}
      <input

        type="file"

        accept=".pdf"

        onChange={(e) => {

          if (e.target.files) {

            setFile(
              e.target.files[0]
            );

          }

        }}

        className="mb-4"
      />

      <br />

      {/* Upload Button */}
      <button

        onClick={uploadPDF}

        className="
          bg-green-600
          text-white
          px-5
          py-2
          rounded
        "
      >
        {
          loading
            ? "Uploading..."
            : "Upload PDF"
        }
      </button>

      {/* Success Message */}
      {
        message && (

          <p className="
            mt-4
            text-green-600
            font-semibold
          ">

            {message}

          </p>

        )
      }

    </div>

  );

}