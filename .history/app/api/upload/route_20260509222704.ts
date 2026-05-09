import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  RecursiveCharacterTextSplitter,
} from "@langchain/textsplitters";

import {
  OpenAIEmbeddings,
} from "@langchain/openai";

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

    // If no file uploaded
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

    // Create text splitter
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

    // Print chunks in terminal
    // Create OpenAI embeddings
const embeddings =
  new OpenAIEmbeddings({

    apiKey:
      process.env.OPENAI_API_KEY,

  });

// Convert chunks into vectors
const vectors =
  await embeddings.embedDocuments(

    chunks.map(
      (chunk) => chunk.pageContent
    )

  );

// Print vectors
console.log(vectors);

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