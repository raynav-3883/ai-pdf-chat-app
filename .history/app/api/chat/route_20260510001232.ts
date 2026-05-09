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

    // Send request to local GPT4All API
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

    // Extract answer
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