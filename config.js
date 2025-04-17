import { Redis } from "ioredis";

class RedisConfig {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || "yourpassword",
    });

    // Error handling for Redis connection
    this.redis.on("error", (err) => {
      console.error("Redis error:", err);
    });
  }

  async consume(channel, callback) {
    try {
      await this.redis.subscribe(channel);
      this.redis.on("message", async (ch, message) => {
        if (channel === ch) {
          try {
            await callback(message);
          } catch (callbackError) {
            console.error("Error in callback:", callbackError);
          }
        }
      });
    } catch (error) {
      console.error(`Failed to subscribe to channel "${channel}":`, error);
    }
  }

  async produce(channel, message) {
    try {
      await this.redis.publish(channel, message);
    } catch (error) {
      console.error(
        `Failed to publish message to channel "${channel}":`,
        error
      );
    }
  }
}

export default RedisConfig;
