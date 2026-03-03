import { useState } from "react";
import { QrcodeCanvas, useQrcodeDownload } from "react-qrcode-pretty";
import { generateNewSession } from "../services/triviaApi";


const QrFormPage = () => {
  const [setQrcode, download, isReady] = useQrcodeDownload();
  const [quizLink, setQuizLink] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleQrGenerate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const sessionId = await generateNewSession()
    setQuizLink(import.meta.env.VITE_BASEURL + "/home/" + sessionId); /// make an env
    console.log(import.meta.env.VITE_BASEURL + "/home/" + sessionId);
    setSubmitted(true); 
  };
  return (
    <div>
      <div
        className={`w-screen h-full flex justify-center items-center bg-[#26403D]`}
      >
        {!submitted ? (
          <form onSubmit={handleQrGenerate} className="flex flex-col gap-5  ">
            <p className="mb-5 text-amber-400 md:text-4xl">
              Click/Tap and scan the QRcode to start your quiz
            </p>
            <button
              type="submit"
              className="p-4 md:w-2/5 place-self-center bg-blue-50 rounded cursor-pointer"
            >
              Generate Quiz QR code
            </button>
          </form>
        ) : (
          <div className="flex flex-col  gap-5">
            <QrcodeCanvas
              size={200}
              padding={10}
              value={quizLink}
              onReady={setQrcode}
            />
            <br />
            <button
              onClick={() => download("qrcode_file_name")}
              disabled={!isReady}
              className="p-4 bg-blue-50 rounded cursor-pointer"
            >
              Download Qrcode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrFormPage;
