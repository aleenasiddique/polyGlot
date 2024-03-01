import OpenAI from "openai"
    
  const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      })  


const handler = async (event) => {
  try {
    const response =  await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: event.body,  
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