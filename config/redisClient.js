// config/redisClient.js
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

//  Check for the presence of `REDIS_URL`
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  console.error(
    " Error: REDIS_URL is not found in the .env file! Ensure it is added."
  );
  process.exit(1);
}

//  Validate if `REDIS_URL` is valid
try {
  new URL(redisUrl);
} catch (error) {
  process.exit(1);
}

//  Create a Redis client with enhanced options
const redisClient = new Redis(redisUrl, {
  tls: redisUrl.startsWith("rediss://") ? {} : undefined, // Automatically enable TLS if the URL starts with rediss://
  retryStrategy: (times) => {
    const delay = Math.min(times * 100, 5000); // Gradual increase in delay
    return delay;
  },
  reconnectOnError: (err) => {
    return true; // Attempt to reconnect on error
  },
});

//  Log Redis events for improved monitoring
redisClient.on("connect", () => {});
redisClient.on("ready", () => {});
redisClient.on("reconnecting", (time) => {});
redisClient.on("error", (err) => {});
redisClient.on("end", () => {});

//  Export the client
export default redisClient;
