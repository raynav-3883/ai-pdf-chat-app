"use client";

import { useState }
from "react";

export default function ChatBox() {

  // User question
  const [question, setQuestion] =
    useState("");

  // Loading state
  const [loading, setLoading] =
    useState(false);

  // Chat messages
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

      // Empty question check
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

      // API request
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

      {/* Heading */}
      <h2 className="
        text-3xl
        font-bold
        mb-6
        text-white
      ">
        Chat with PDF
      </h2>

      {/* Chat Container */}
      <div className="
        border
        border-gray-700
        rounded-xl
        p-4
        h-[500px]
        overflow-y-auto
        bg-[#111]
        space-y-4
      ">

        {
          messages.map(
            (msg, index) => (

              <div
                key={index}
                className={

                  msg.role === "user"

                  ? "flex justify-end"

                  : "flex justify-start"

                }
              >

                <div
                  className={

                    `
                    max-w-[80%]
                    px-4
                    py-3
                    rounded-xl
                    whitespace-pre-wrap
                    text-sm
                    leading-relaxed
                    `

                    +

                    (

                      msg.role === "user"

                      ? `
                        bg-blue-600
                        text-white
                      `

                      : `
                        bg-gray-800
                        text-gray-100
                      `

                    )

                  }
                >

                  <p className="
                    font-bold
                    mb-2
                  ">

                    {
                      msg.role === "user"
                      ? "You"
                      : "AI"
                    }

                  </p>

                  <p>
                    {msg.text}
                  </p>

                </div>

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

        placeholder="Ask anything about the PDF..."

        className="
          w-full
          border
          border-gray-700
          bg-[#111]
          text-white
          p-4
          rounded-xl
          h-28
          mt-5
          outline-none
        "
      />

      {/* Button */}
      <button

        onClick={askQuestion}

        className="
          bg-blue-600
          hover:bg-blue-700
          transition
          text-white
          px-6
          py-3
          rounded-xl
          mt-4
          font-semibold
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