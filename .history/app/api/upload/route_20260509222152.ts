import {
  NextRequest,
  NextResponse,
} from "next/server";
import {
  RecursiveCharacterTextSplitter,
} from "langchain/text_splitter";
// IMPORTANT FIX
const pdfParse =
  require("pdf-parse/lib/pdf-parse");

export async function POST(
  req: NextRequest
) {

  try {

    // Get form data
    const formData =
      await req.formData();

    // Get uploaded PDF
    const file =
      formData.get("pdf") as File;

    // No file check
    if (!file) {

      return NextResponse.json({
        message: "No PDF uploaded",
      });

    }

    // Convert file to buffer
    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    // Parse PDF
    const pdfData =
      await pdfParse(buffer);

    // Print text
    console.log(pdfData.text);

    // Success response
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