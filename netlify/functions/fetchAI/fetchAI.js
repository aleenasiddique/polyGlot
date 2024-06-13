import OpenAI from "openai"
    
  const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
     
      })  
   if(!openai) {
    console.log("no key")
   }


const handler = async (event) => {
  const messages = JSON.parse(event.body)
  try {
    
    const response =  await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: messages,  
      temperature: 0.8
    }) 
      return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response
      }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }