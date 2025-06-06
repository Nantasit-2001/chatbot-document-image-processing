import { createPartFromUri, GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState,useEffect } from "react";

function Summary({file}) {
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
                in one short paragraph (less than 100 words).
                Use just plain text with no markdown or html tags
                และขอให้ตอบกลับเป็นภาษาไทย`,
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
            <h2>The summary</h2>
            <img src={file.imageUrl} alt="Preview Image"/>  
            {status === 'loading'
                ?<div class="loader"></div>
                :status ==='success'
                    ?<p>{summary}</p>
                :status ==='error'
                    ?<p>Error getting the summary</p>
                    :''
            }
        </section>
    )
}

export default Summary
