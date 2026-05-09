import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

// Gemini client
const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
  );

export async function POST(
  req: NextRequest
) {

  try {

    // Get frontend data
    const body =
      await req.json();

    const question =
      body.question;

    // Load Gemini model
    const model =
      genAI.getGenerativeModel({

        model:
          "gemini-1.5-flash",

      });

    // Generate AI response
    const result =
      await model.generateContent(
        question
      );

    // Extract response text
    const answer =
      result.response.text();

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