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

    // Get uploaded PDF file
    const file =
      formData.get("pdf") as File;

    // If no file uploaded
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

    // Load PDF document
    const loadingTask =
      pdfjsLib.getDocument({
        data: buffer,
      });

    const pdfDocument =
      await loadingTask.promise;

    let extractedText = "";

    // Loop through all pages
    for (
      let i = 1;
      i <= pdfDocument.numPages;
      i++
    ) {

      // Get current page
      const page =
        await pdfDocument.getPage(i);

      // Extract text content
      const textContent =
        await page.getTextContent();

      // Convert text items into string
      const pageText =
        textContent.items
          .map((item: any) => item.str)
          .join(" ");

      // Add page text
      extractedText +=
        pageText + "\n";

    }

    // Print extracted text in terminal
    console.log(extractedText);

    // Return success response
    return NextResponse.json({

      message:
        "PDF uploaded successfully",

      text: extractedText,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      message:
        "Something went wrong",

    });

  }

}