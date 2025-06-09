import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import Summary from "./components/Summary";
import Chat from "./components/Chat";
import SwitchComponent from "./components/switch";
import { useState,useEffect } from "react";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [thaiLanguage, setThaiLanguage] = useState(false);
  const [formal,setFormal] = useState(false)
  const [concise,setConcise] = useState(false)
  const [lotsOfContent,setLotsOfContent] = useState(false)
  const [warning, setWarning] = useState("");
  return (
    <>
      <main className="container">
        <Header />
        {uploadedFile ? (
          <>
            <Summary file={uploadedFile} thaiLanguage={thaiLanguage} concise={concise} formal={formal} lotsOfContent={lotsOfContent} warning={warning} />
            <Chat file={uploadedFile} thaiLanguage={thaiLanguage} formal={formal}/>
          </>
        ) : (
          <FileUpload setFile={setUploadedFile} setWarning={setWarning} />
        )}


      {!uploadedFile &&
      (<div className="switch-box">
        <SwitchComponent
          label="Thai language"
          value={thaiLanguage}
          onChange={setThaiLanguage}
        />
        <SwitchComponent
          label="formal"
          value={formal}
          onChange={setFormal}
        />
       <SwitchComponent
          label="Summary"
          value={concise}
          onChange={(value) => {
          setConcise(value);
          if (value) setLotsOfContent(false);
          }}
      />
      <SwitchComponent
        label="Lots of content"
        value={lotsOfContent}
        onChange={(value) => {
        setLotsOfContent(value);
        if (value) setConcise(false);
      }}
/>
      </div>)}
      </main>
    </>
  );
}

export default App;
