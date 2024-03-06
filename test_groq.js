const Groq = require("groq-sdk");
// const config = require('./config.json'); // Assuming your Groq API key is stored here

const groq = new Groq({ apiKey: "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" });

async function main() {
    async function fetchGroqResponse(prompt) {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "you are a helpful assistant.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "mixtral-8x7b-32768",
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: false,
        });

        return chatCompletion.choices && chatCompletion.choices[0].message && chatCompletion.choices[0].message.content ? chatCompletion.choices[0].message.content.trim() : "";
    }

    const userInput = "How long is thee nile river";
    const groqResponse = await fetchGroqResponse(userInput);

    console.log("User Input:", userInput);
    console.log("Groq Response:", groqResponse);
}

main().catch(error => console.error(error));
