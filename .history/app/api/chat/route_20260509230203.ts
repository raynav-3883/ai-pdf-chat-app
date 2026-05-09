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

    // Get frontend data
    const body =
      await req.json();

    const question =
      body.question;

    // Generate AI response
    const response =
      await hf.textGeneration({

        model:
          "gpt2",

        inputs:
          question,

        parameters: {

          max_new_tokens: 100,

          temperature: 0.7,

        },

      });

    // Return answer
    return NextResponse.json({

      answer:
        response.generated_text,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      answer:
        "Something went wrong",

    });

  }

}