import RedisConfig from "./config.js";

const redisConfig = new RedisConfig();

const sendMessageToRedis = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        status: "Error",
        message: "Message is required.",
      });
    }

    await redisConfig.produce("PubSub", message);

    res.status(200).json({
      status: "Ok!",
      message: "Message successfully sent!",
    });
  } catch (error) {
    console.error("Error sending message to Redis:", error);
    res.status(500).json({
      status: "Error",
      message: "Failed to send message.",
    });
  }
};

const controllers = { sendMessageToRedis };

export default controllers;
