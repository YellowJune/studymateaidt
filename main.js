const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/kakao-skill', async (req, res) => {
  const userMessage = req.body.userRequest.utterance;

  try {
    const openaiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const gptMessage = openaiRes.data.choices[0].message.content;

    const kakaoResponse = {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: gptMessage
            }
          }
        ]
      }
    };

    res.json(kakaoResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
