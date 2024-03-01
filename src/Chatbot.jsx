import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp, faQuestion } from "@fortawesome/free-solid-svg-icons"
import mapBackground from "./assets/map.png"
import parrot from "./assets/parrot.png"
import spanishFlag from './assets/spain.png'
import japeneseFlag from "./assets/japan.png"
import frenchFlag from "./assets/france.png"
import TypingAnimation from "./components/TypingAnimation"


export default function Chatbot(){
    
    const [questionInput, setQuestionInput] = React.useState('')
    const [languageInput, setLanguageInput] = React.useState('Spanish')
    const [conversationArray, setConversationArray] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const scrollRef = React.useRef(null)


   
      // Open AI API messages array
      const messages =[{
        role: 'system',
        content: `You are an expert language translator. You translate the text given in English properly to ${languageInput}`
    }] 
     //scroll to the bottom of the coversation Array to see the new conversation 
     React.useEffect(() => {
        if (scrollRef.current) {
          const { scrollHeight, clientHeight } = scrollRef.current
          scrollRef.current.scrollTop = scrollHeight - clientHeight
        }
      }, [conversationArray])

     //pushing user's input into conversation array and to messages array
     const handleSubmit = async (event) => {
        event.preventDefault()
        const userInputMessage = {
            role: 'user',
            content: questionInput
        };
        setConversationArray((prevConversation) => [...prevConversation, { type: 'user', message: questionInput }])
        setQuestionInput('')
         await fetchTranslation(userInputMessage) // Call fetchTranslation after a delay
           
     
    }
    
   
            //making API call to OpenAI to fetch translation
         
            const fetchTranslation = async  (userInputMessage) => {
               /*
                setIsLoading(true)
                setError(null) */
             const url = 'https://poly-glot.netlify.app/.netlify/functions/fetchAI'
    
             const response = await fetch(url, {
             method: 'POST',
             headers: {
            'content-type': 'text/plain',
              },
             body: [...messages, userInputMessage]
              })
              const data = await response.json() 
              console.log(data)              /*
                try {
                   
                     
                   
                   setConversationArray((prevConversation) => [...prevConversation, {type: 'bot', message: response.choices[0].message.content}])
                const assistantContent = response.choices[0].message
                     messages.push(assistantContent)  
                    
                } catch (error) {
                   
                    setError('Unable to access AI. Please try again')
                }
                setIsLoading(false)
               */
            }
            

       
        
       
    

    return (
      
        <div className="h-screen  w-screen flex justify-center items-center bg-zinc-100 ">
        <main className="h-[500px] md:h-[650px] w-[100%] max-w-[400px] bg-white md:shadow-lg md:shadow-black/10 flex flex-col">
            <header className="w-full h-40 bg-cover flex justify-center items-center gap-4 px-2" style={{backgroundImage: `url(${mapBackground})`}}>
                  <img src={parrot} alt="parrot" className="h-[70%]"/>
                  <div className=" flex flex-col justify-center  md:gap-1">
                  <p className="text-lime-600 font-extrabold text-3xl">PollyGlot</p>
                  <p className="text-white font-semibold  text-xs">Perfect Translation Every Time</p>
                  </div>
            </header>
           <section className=" border-2 border-zinc-300 m-4 px-4 pt-6 pb-2 rounded-lg flex flex-col flex-1 ">
    
            <div ref={scrollRef}
            className="h-[155px] md:h-[305px] overflow-y-auto mb-2 px-2">
               {Object.keys(conversationArray).length === 0  &&  <div className="p-2 rounded-lg bg-sky-600 text-white">
                <p>Select the language you want me to translate into, type your text and hit send!</p>
                </div> }
                <div 
                 
                className="flex flex-col gap-2">
                    {
                        conversationArray.map((message, index) => (
                            <div className={`py-2 px-4 text-white relative w-[content] max-w-[100%]
                            before:absolute before:inset-0 ${message.type === 'user' ? "rounded-tr-lg rounded-br-lg rounded-bl-lg ml-auto bg-green-500" 
                            :
                             "rounded-tl-lg rounded-br-lg rounded-bl-lg mr-auto bg-sky-600" }`}
                            key={index}>{message.message}</div>
                        ))
                         }
                           {
                            isLoading && 
                            <div className="py-3 px-4 rounded-tl-lg rounded-br-lg rounded-bl-lg relative w-[content] max-w-[100%] before:absolute before:inset-0 bg-sky-600 mr-auto">
                             <TypingAnimation />
                            </div>
                             }
                             {
                                error && <div className="py-2 px-4 rounded-tl-lg rounded-br-lg rounded-bl-lg text-white  relative w-[content] max-w-[100%] before:absolute before:inset-0 bg-sky-600 mr-auto">
                                    {error}
                                </div>
                             }
                         
                    
                </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full sticky bottom-0">
                <div className="flex mt-4 w-[95%] mx-auto">
         <input type="text"  name="question"
         className={`h-12 border border-zinc-300 py-2 px-4  flex-grow rounded-tl-lg rounded-bl-lg focus:outline-none ${questionInput === '' ? "caret-zinc-300 focus:border-zinc-300" : "caret-sky-600 focus:border-sky-600"}`}
         value={questionInput}
         onChange={(event) => setQuestionInput(event.target.value)}
         autoComplete="off"
         />
         <button type="submit" name="submitButton"
         className={`ml-[-1px] h-12 w-12 rounded-tr-lg rounded-br-lg text-white ${questionInput === '' ? " bg-zinc-300 " : " bg-sky-600 "}`} disabled={questionInput === ''}>
         <FontAwesomeIcon icon={faArrowUp}/></button>
         </div>
            
          
          
                <div className="flex w-full justify-center gap-6">
            <div className="flex gap-1">
            <input type="radio" id="spanishFlag" name="flag" value="Spanish" defaultChecked  onChange={(event) => setLanguageInput(event.target.value)}/>
            <label  className="cursor-pointer" htmlFor="spanishFlag" >
            <img src={spanishFlag} alt="Flag of Spain"/></label>
            </div>
            <div className="flex gap-1">
            <input type="radio" id="japeneseFlag" name="flag" value="Japenese"  onChange={(event) => setLanguageInput(event.target.value)}/>
            <label  className="cursor-pointer" htmlFor="japeneseFlag" >
            <img src={japeneseFlag} alt="Flag of Japan"/></label>
            </div>
            <div className="flex gap-1">
            <input type="radio" id="frenchFlag" name="flag" value="French"  onChange={(event) => setLanguageInput(event.target.value)}/>
            <label  className="cursor-pointer " htmlFor="frenchFlag" >
            <img src={frenchFlag} alt="Flag of France"/></label>
            </div>
            </div>
           </form>
           </section>
        </main>
        </div>
    )
}