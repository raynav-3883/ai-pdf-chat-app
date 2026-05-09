import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function POST(
  req: NextRequest
) {

  try {

    // Get frontend data
    const body =
      await req.json();

    const question =
      body.question;

    // Send request to OpenRouter
    const response =
      await fetch(

        "https://openrouter.ai/api/v1/chat/completions",

        {

          method: "POST",

          headers: {

            "Authorization":
              `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type":
              "application/json",

            "HTTP-Referer":
              "http://localhost:3000",

            "X-Title":
              "AI PDF Chat App",

          },

          body: JSON.stringify({

            // AUTO MODEL
            model:
              "openrouter/auto",

            messages: [

              {
                role: "user",
                content: question,
              },

            ],

          }),

        }

      );

    // Convert response
    const data =
      await response.json();

    console.log(data);

    // Extract AI answer
    const answer =
      data.choices?.[0]
      ?.message?.content
      ||
      data.error?.message
      ||
      "No response";

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