import {
  NextRequest,
  NextResponse,
} from "next/server";

import * as pdfjsLib
from "pdfjs-dist";

export async function POST(
  req: NextRequest
) {

  try {

    // Get form data
    const formData =
      await req.formData();

    // Get uploaded file
    const file =
      formData.get("pdf") as File;

    // If no file
    if (!file) {

      return NextResponse.json({
        message: "No PDF uploaded",
      });

    }

    // Convert file into buffer
    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    // Extract PDF text
    const pdfData =
      await pdfParse(buffer);

    // Print extracted text
    console.log(pdfData.text);

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