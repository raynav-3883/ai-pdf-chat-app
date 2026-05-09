import {
  NextRequest,
  NextResponse,
} from "next/server";

const pdfParse = require("pdf-parse");

export async function POST(
  req: NextRequest
) {

  try {

    const formData =
      await req.formData();

    const file =
      formData.get("pdf") as File;

    if (!file) {

      return NextResponse.json({
        message: "No PDF uploaded",
      });

    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const pdfData =
      await pdfParse(buffer);

    return NextResponse.json({

      message:
        "PDF uploaded successfully",

      text: pdfData.text,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      message:
        "Something went wrong",

    });

  }

}