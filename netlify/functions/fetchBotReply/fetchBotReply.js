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
      prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
  ###
  outline: Two dogs fall in love and move to Hawaii to learn to surf.
  message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
  ###
  outline: A plane crashes in the jungle and the passengers have to walk 1000km to safety.
  message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
  ###
  outline: A group of corrupt lawyers try to send an innocent woman to jail.
  message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
  ###
  outline: ${event.body}
  message:`,
      //prompt: `Generate a short message empathyc with "${outline}" and that you need some minutes to think about it. Mention one aspect of the sentence` ,
      max_tokens: 60
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


