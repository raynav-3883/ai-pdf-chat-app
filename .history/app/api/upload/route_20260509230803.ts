import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  RecursiveCharacterTextSplitter,
} from "@langchain/textsplitters";

// PDF parser
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

    // Convert file into buffer
    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    // Extract PDF text
    const pdfData =
      await pdfParse(buffer);

    // Create splitter
    const splitter =
      new RecursiveCharacterTextSplitter({

        chunkSize: 1000,
        chunkOverlap: 200,

      });

    // Split text into chunks
    const chunks =
      await splitter.createDocuments([
        pdfData.text,
      ]);

    // Print chunks
    console.log(chunks);

    // Success response
    return NextResponse.json({

      message:
        "PDF uploaded successfully",

      totalChunks:
        chunks.length,

      chunks,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      message:
        "Something went wrong",

    });

  }

}