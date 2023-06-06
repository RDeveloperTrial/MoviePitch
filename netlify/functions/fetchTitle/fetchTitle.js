import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const handler = async (event) => {
  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: 'OK',
    }
  }
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Generate a catchy movie title for this synopsis: ${event.body}`,
        max_tokens: 20,
        temperature: 0.7
      })
        return {
            statusCode: 200,
            body: JSON.stringify({
                reply: response.data                
            })
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }
