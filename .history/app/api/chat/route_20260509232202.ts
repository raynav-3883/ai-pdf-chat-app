import {
  NextRequest,
  NextResponse,
} from "next/server";

import OpenAI
from "openai";

// OpenAI client
const openai =
  new OpenAI({

    apiKey:
      process.env.OPENAI_API_KEY,

  });

export async function POST(
  req: NextRequest
) {

  try {

    // Get frontend data
    const body =
      await req.json();

    const question =
      body.question;

    // Ask ChatGPT
    const response =
      await openai.chat.completions.create({

        model:
          "gpt-4o-mini",

        messages: [

          {
            role: "user",
            content: question,
          },

        ],

      });

    // Extract answer
    const answer =
      response.choices[0]
      .message.content;

    // Return answer
    return NextResponse.json({
      answer,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      answer:
        "Something went wrong",

    });

  }

}