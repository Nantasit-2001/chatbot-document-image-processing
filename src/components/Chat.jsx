import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai";
function Chat({ file ,thaiLanguage ,formal}) {
    const genAi = new GoogleGenerativeAI(import.meta.env.VITE_REACT_APP_GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
    const [message, setMessage] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Added missing status state

    async function headersSendMessage() {
        if (input.length) {
            let chatMessage = [...message, { role: 'user', text: input }];
            setInput('');
            setMessage(chatMessage);

            try {
                setIsLoading(true);
                const result = await model.generateContent([
                    {
                        inlineData: {
                            mimeType: file.type,
                            data: file.file
                        }
                    },
                    `Answer this question about the attached document: ${input}.
                    Answer as a chat bot with short message and text only (no markdowns, tags or symbols)
                    ${thaiLanguage && 'และขอให้ตอบกลับเป็นภาษาไทย'}
                    ${formal && 'Write in a formal tone.'}
                    chat history: ${JSON.stringify(message)}`
                ]);
                chatMessage = [...chatMessage, { role: 'model', text: result.response.text() }];
                setMessage(chatMessage);
            } catch (error) {
                console.log(error,"==")
                chatMessage = [...chatMessage, { role: 'error', text: 'Error sending message, Please try again later' }];
                setMessage(chatMessage);
            }finally{
                setIsLoading(false)
            }
        }
    }

    return (
        <section className="chat-window">
            <h2>Chat</h2>
            {message.length > 0
                ? <div className="chat">
                    {
                        message.map(msg => (
                            <div className={msg.role} key={msg.text}>
                                <p>{msg.text}</p>
                            </div>
                        ))
                    }
                        {isLoading && <div className="loader"></div>}
                    
                </div>
                : ""
            }
            <form
                className="input-area"
                onSubmit={(e) => {
                e.preventDefault();
                headersSendMessage();
                }}
            >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Ask any question about the uploaded document..."
                />
                <button type="submit">Send</button>
            </form>
        </section>
    );
}
export default Chat;