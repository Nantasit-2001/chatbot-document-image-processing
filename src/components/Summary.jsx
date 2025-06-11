import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState,useEffect } from "react";

function Summary({file,thaiLanguage,concise,formal,lotsOfContent,warning}) {
    const genAi = new GoogleGenerativeAI(import.meta.env.VITE_REACT_APP_GEMINI_API_KEY)
    const model = genAi.getGenerativeModel({model:'models/gemini-1.5-flash'})
    const [summary,setSumary]=useState("");
    const [status,setStatus]=useState("idle");
    useEffect(()=>{
        if(status==='idle'){
            getSummary();
        }
    },[summary])

    async function getSummary() {
        try{
            setStatus('loading')
            const result = await model.generateContent([
                {
                    inlineData: {
                        mimeType: file.type,
                        data: file.file
                    }
                },
                `Summarize the document
                ${concise
                    ? 'Please provide a summary of the content in less than 40 words.'
                    : lotsOfContent
                        ? 'Please explain the content in detail without worrying about the length.'
                        :"in one short paragraph (less than 100 words)."
                }
                Use just plain text with no markdown or html tags and Use clear line breaks to separate each numbered item.
                ${thaiLanguage && 'และขอให้ตอบกลับเป็นภาษาไทย'}
                ${formal && 'Write in a formal tone.'}`,
            ]);
            setSumary(result.response.text())
            setStatus('success')
        }catch(error){
            setStatus('error')
            console.log(error,">-----<")
    }
    }
    return (
        <section className="summary">
            <img
                src={file.imageUrl}
                alt="Preview"
                className={file.type.toLowerCase().includes('pdf') ? "pdf-icon" : "uploaded-image"}

            />
            <h2>The summary</h2>
            {status === 'loading'
                ?
                <>
                 {warning && <p style={{ color: "orange", marginBottom: "16px"}}>{warning}</p>}
                    <div className="center">
                        <div class="loader"></div>
                    </div>
                </>
                    :status ==='success'
                    ?<p style={{ whiteSpace: "pre-line",textAlign: "left"}}>{summary}</p>
                :status ==='error'
                    ?<p>Error getting the summary</p>
                    :''
            }
        </section>
    )
}

export default Summary
