import PDFUpload
from "@/components/PDFUpload";

import ChatBox
from "@/components/ChatBox";

export default function Home() {

  return (

    <main className="
      p-10
      max-w-4xl
      mx-auto
    ">

      {/* Heading */}
      <h1 className="
        text-4xl
        font-bold
        mb-10
      ">
        AI PDF Chat App
      </h1>

      {/* Upload Component */}
      <PDFUpload />

      {/* Chat Component */}
      <ChatBox />

    </main>

  );

}