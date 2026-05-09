import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function POST(
  req: NextRequest
) {

  try {

    // Get question
    const body =
      await req.json();

    const question =
      body.question;

    // Gemini API request
    const response =
      await fetch(

        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            contents: [

              {
                parts: [
                  {
                    text: question,
                  },
                ],
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
      data.candidates?.[0]
      ?.content?.parts?.[0]
      ?.text
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