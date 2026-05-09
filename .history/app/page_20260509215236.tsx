import PDFUpload
from "@/components/PDFUpload";

export default function Home() {

  return (

    <main className="p-10">

      {/* Heading */}
      <h1 className="
        text-4xl
        font-bold
        mb-10
      ">
        AI PDF Chat App
      </h1>

      {/* PDF Upload Component */}
      <PDFUpload />

    </main>

  );

}