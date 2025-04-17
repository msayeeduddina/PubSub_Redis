import express from "express";
import bodyParser from "body-parser";
import controllers from "./controller.js";
import RedisConfig from "./config.js";

const app = express();
const jsonParser = bodyParser.json();

app.post("/api/send", jsonParser, controllers.sendMessageToRedis);

// Consume from channel redis "PubSub"
const redisConfig = new RedisConfig();
redisConfig.consume("PubSub", (message) => {
  console.log("📨 Received message:", message);
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
