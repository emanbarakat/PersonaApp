
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require("openai");



const app = express();
const port = 8080;
app.use(express.json());

console.log("Testing env",process.env.OPENAI_API_KEY );
const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});

        app.post("/generate", async (req, res,next) => {
        try {
            const { inputText, persona, model,audience,length,context } = req.body;
            const startTime = Date.now();
            const response  = await openai.chat.completions.create({
            model, //"gpt-4o-mini", //  "gpt-3.5-turbo" 
            messages: [
                { role: "system", content: `You are a ${persona} writing for ${audience}. Context: ${context.join(", ")}`  },
                { role: "user", content: inputText },
            ],
             max_tokens: length
            });

            const result = {
            title: "Generated Content",
            body: response.choices[0].message.content,
            style: persona,
            citations:[],// 
            moderation_flags:"", 
            tokens: {
            prompt: response.usage.prompt_tokens,
            completion: response.usage.completion_tokens
            },
            latency_ms: Date.now() - startTime,
            cost_est: 0.0031
        };
                res.json(result);
        }catch(error)
        {
                next(error);
        }

  });


  app.use((error,req,res,next)=>{
    console.log("Error:", error);
    res.status(500).json({ error: error+"" });
  })

  app.listen(port, () =>
  console.log(`I'm Listening -> http://localhost:${port}`)
);
