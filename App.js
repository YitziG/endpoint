import express from "express";
import bodyParser from "body-parser";
import { OpenAI } from "langchain/llms/openai";
import { APIChain } from "langchain/chains";
import { WIX_API_DOCS } from "./langchain/docs/wix.mjs";

// Load environment variables from .env file
import { config } from "dotenv";
config();

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    next();
});

app.post('/everything', async (req, res) => {
    const userText = req.body.text;

    try {
        // Initialize the OpenAI model with your API key
        const model = new OpenAI({ modelName: "gpt-4", openAIApiKey: process.env.OPENAI_API_KEY });
        
        // Initialize the APIChain with the OpenAI model and the Wix API documentation
        const chain = APIChain.fromLLMAndAPIDocs(model, WIX_API_DOCS, {
            headers: {
                Authorization: `Bearer ${process.env.WIX_API_KEY}`, 'wix-site-id': process.env.WIX_SITE_ID,
            }
        });

        // Call the chain with the user's text
        const result = await chain.call({ question: userText });

        res.send(result.output);
    } catch (error) {
        console.error('Error during request processing: ', error);
        res.status(500).send('Something went wrong');
    }
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});
