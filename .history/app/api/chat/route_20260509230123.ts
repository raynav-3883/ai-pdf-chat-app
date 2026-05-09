import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  HfInference,
} from "@huggingface/inference";

// HuggingFace client
const hf =
  new HfInference(
    process.env.HUGGINGFACE_API_KEY
  );

export async function POST(
  req: NextRequest
) {

  try {

    // Get question
    const body =
      await req.json();

    const question =
      body.question;

    // Ask AI
    const response =
      await hf.chatCompletion({

        model:
          "HuggingFaceH4/zephyr-7b-beta",

        messages: [
          {
            role: "user",
            content: question,
          },
        ],

        max_tokens: 200,

      });

    // Return answer
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