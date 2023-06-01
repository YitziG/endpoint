const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('langchain/llms/openai');
const { APIChain } = require('langchain/chains');
const { WIX_API_DOCS } = require('langchain/docs/wix');
const { setTokensForUser } = require('./wix/token_management.mjs');
const { wixClient } = require('./wix/wix_client.mjs');

// Load environment variables from .env file
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.post('/chat-completions', async (req, res) => {
    const userText = req.body.text;
    const userId = req.body.userId;

    try {
        // Set the user's tokens in the Wix database
        await setTokensForUser(userId);
        // Initialize the OpenAI model with your API key
        const model = new OpenAI({ modelName: "gpt-4", apiKey: process.env.OPENAI_API_KEY });

        // Initialize the APIChain with the OpenAI model and the Wix API documentation
        const chain = APIChain.fromLLMAndAPIDocs(model, WIX_API_DOCS);

        // Call the chain with the user's text
        const result = await chain.call({ question: userText });

        console.log(result);

        // TODO: Process the result and perform the appropriate actions on the Wix API

        // // Execute tasks using the Wix Headless API
        // const wixResponse = await axios.post('YOUR_WIX_API_ENDPOINT', {
        //     action: langchainResponse.choices[0].text,
        //     apiKey: 'YOUR_WIX_API_KEY',
        // });

        // temporarily return the premature result from the chain
        res.send(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});
