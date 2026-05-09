"use client";

import { useState }
from "react";

export default function ChatBox() {

  // Store question
  const [question, setQuestion] =
    useState("");

  // Loading state
  const [loading, setLoading] =
    useState(false);

  // Chat history
  const [messages, setMessages] =
    useState<
      {
        role: string;
        text: string;
      }[]
    >([]);

  // Ask AI
  const askQuestion = async () => {

    try {

      // Empty check
      if (!question) {

        alert("Enter question");

        return;

      }

      // Add user message
      setMessages((prev) => [

        ...prev,

        {
          role: "user",
          text: question,
        },

      ]);

      setLoading(true);

      // Send request
      const res =
        await fetch(

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

      // Add AI response
      setMessages((prev) => [

        ...prev,

        {
          role: "ai",
          text: data.answer,
        },

      ]);

      // Clear input
      setQuestion("");

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Something went wrong");

    }

  };

  return (

    <div className="mt-10">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Chat with PDF
      </h2>

      {/* Chat Messages */}
      <div className="
        border
        rounded
        p-4
        h-[500px]
        overflow-y-auto
        mb-4
      ">

        {
          messages.map(
            (msg, index) => (

              <div
                key={index}
                className="
                  mb-4
                "
              >

                <p className="
                  font-bold
                ">

                  {
                    msg.role === "user"
                    ? "You"
                    : "AI"
                  }

                  :

                </p>

                <p className="
                  bg-gray-100
                  p-3
                  rounded
                ">
                  {msg.text}
                </p>

              </div>

            )
          )
        }

      </div>

      {/* Input */}
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
          h-28
        "
      />

      {/* Button */}
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

    </div>

  );

}