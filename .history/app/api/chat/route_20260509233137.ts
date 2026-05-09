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

          },

          body: JSON.stringify({

            model:
              "deepseek/deepseek-r1:free",

            messages: [

              {
                role: "user",
                content: question,
              },

            ],

          }),

        }

      );

    // Convert response to JSON
    const data =
      await response.json();

    // Print API response
    console.log(data);

    // Extract AI answer
    const answer =
      data.choices?.[0]
      ?.message?.content
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