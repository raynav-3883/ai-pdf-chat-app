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

    // Send request to GPT4All local API
    const response =
      await fetch(

        "http://localhost:4891/v1/chat/completions",

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            // REQUIRED MODEL NAME
            model:
              "Llama 3 8B Instruct",

            messages: [

              {
                role: "user",
                content: question,
              },

            ],

            max_tokens: 200,

            temperature: 0.7,

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