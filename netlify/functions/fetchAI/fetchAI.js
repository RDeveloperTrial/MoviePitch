import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const handler = async (event) => {
    try {
        const response = await openai.createImage({
          prompt: event.body, //image description
          n: 1,
          size: '256x256',
          response_format: 'url'
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
