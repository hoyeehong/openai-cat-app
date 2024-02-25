import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import "dotenv/config";
import assistant from "./assistant.js";

const app = express();
const PORT = process.env.PORT || 3001;
const CAT_API_KEY = process.env.CAT_API_KEY;

app.use(cors());
app.use(bodyParser.json());

app.post("/query", async (req, res) => {
  try {
    const { query } = req.body;
    let assistantResponse = await assistant(query.toLowerCase());
    let response;

    if (assistantResponse?.animal) {
      let catEndpoint;
      if (assistantResponse?.breed) {
        catEndpoint = `breeds/search?q=${assistantResponse.breed}`;
      } else {
        catEndpoint = `images/search`;
      }

      response = await axios.get(
        `https://api.thecatapi.com/v1/${catEndpoint}`,
        {
          params: {
            limit: 1,
          },
          headers: {
            "x-api-key": CAT_API_KEY,
          },
        }
      );

      let replyUrl = response.data[0]?.url
        ? response.data[0].url
        : response.data[0].image.url;
      res.json({ reply: replyUrl });
    } else {
      res.json({ reply: assistantResponse });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
