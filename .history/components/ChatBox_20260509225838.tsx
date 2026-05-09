"use client";

import { useState }
from "react";

export default function ChatBox() {

  // Store question
  const [question, setQuestion] =
    useState("");

  // Store AI answer
  const [answer, setAnswer] =
    useState("");

  // Loading state
  const [loading, setLoading] =
    useState(false);

  // Ask AI
  const askQuestion = async () => {

    try {

      // Prevent empty question
      if (!question) {

        alert("Enter a question");

        return;
      }

      setLoading(true);

      // Send question to backend
      const res = await fetch(
        "/api/chat",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            question,
          }),

        }
      );

      const data =
        await res.json();

      // Store answer
      setAnswer(data.answer);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Something went wrong");

    }

  };

  return (

    <div className="mt-10">

      {/* Question Input */}
      <textarea

        value={question}

        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }

        placeholder="
Ask anything about the PDF...
"

        className="
          w-full
          border
          p-4
          rounded
          h-32
        "
      />

      {/* Ask Button */}
      <button

        onClick={askQuestion}

        className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded
          mt-4
        "
      >
        {
          loading
            ? "Thinking..."
            : "Ask AI"
        }
      </button>

      {/* Answer Box */}
      <div className="
        mt-6
        border
        p-4
        rounded
      ">

        <h2 className="
          font-bold
          mb-2
        ">
          AI Answer:
        </h2>

        <p>
          {answer}
        </p>

      </div>

    </div>

  );

}