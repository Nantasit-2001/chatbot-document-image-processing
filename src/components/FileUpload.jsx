import { Buffer } from "buffer";
function FileUpload({ setFile, setWarning}) {
    async function handleFileUpload(event) {
    const fileUpload = await event.target.files[0].arrayBuffer();
    const maxSize = 2 * 1024 * 1024; 
    if (event.target.files[0].size > maxSize) {
      setWarning("Large files may take some time to process. Please wait...");
    } else {
      setWarning("");
    }
    
    const file = {
      type: event.target.files[0].type,
      file: Buffer.from(fileUpload).toString("base64"),
      imageUrl: event.target.files[0].type.includes("pdf")
        ? "/PDF-icon.jpg"
        : URL.createObjectURL(event.target.files[0]),
    };
    setFile(file);
  }

  return (
    <section className="file-upload">
      <h2>🖼️📑 Upload your document or image</h2>
      <label htmlFor="file-upload" className="file-upload-label">
        Choose a file 
      </label>
      <input
        id="file-upload"
        className="file-upload-input"
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileUpload}
      />
    </section>
  );
}

export default FileUpload;
