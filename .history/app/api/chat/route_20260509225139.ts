import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  HfInference,
} from "@huggingface/inference";

// Create HuggingFace client
const hf =
  new HfInference(
    process.env.HUGGINGFACE_API_KEY
  );

export async function POST(
  req: NextRequest
) {

  try {

    // Get question from frontend
    const body =
      await req.json();

    const question =
      body.question;

    // Ask FREE AI model
    const response =
      await hf.chatCompletion({

        model:
          "mistralai/Mistral-7B-Instruct-v0.3",

        messages: [
          {
            role: "user",
            content: question,
          },
        ],

        max_tokens: 200,

      });

    // Return AI answer
    return NextResponse.json({

      answer:
        response.choices[0]
        .message.content,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      answer:
        "Something went wrong",

    });

  }

}