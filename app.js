const express = require('express');
const http = require('http');

const Groq = require("groq-sdk");

// import Groq from 'groq-sdk';
// const Groq = require("groq-sdk");
  // const groq = new Groq(); // Initialize Groq
const groq = new Groq({ apiKey: "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" });
  

  // Function adapted for Groq's API
  async function fetchGroqResponse(userMessage) {

    console.log("First Step")
    try {

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "you are a helpful assistant.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        model: "mixtral-8x7b-32768", // Specify the model
        temperature: 0.5, // Set the temperature
        max_tokens: 1024, // Set the maximum number of tokens
        top_p: 1, // Set top_p for nucleus sampling
        stop: null, // Define any stop sequences if necessary
        stream: false, // Set streaming options if required
      });
  
      // Assuming the response structure is similar to OpenAI's, adjust accordingly
       console.log(chatCompletion.choices[0]?.message?.content.trim())
      
      return chatCompletion.choices[0]?.message?.content.trim() || '';
      
    } catch (error) {
      console.error('Groq API request failed:', error);
      throw error; // Rethrow or handle as needed
    }
  }
  

const port = 3000;

const app = express();
app.use('/', express.static(__dirname));
app.use(express.urlencoded());
const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post('/fetchGroqResponse', async(req, res) => {

    console.log(req.body)
    var userInput = req.body.userInput
    console.log(userInput)
    res.send(
        {
            "message": await fetchGroqResponse(userInput)

        })

})
app.get('/helloworld', async(req, res) => {

    await fetchGroqResponse("What is the highest peak on earth")

    

    res.send(
        {

            message:"Hello World"

        }


    )

})
const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on port localhost:${port}`));
