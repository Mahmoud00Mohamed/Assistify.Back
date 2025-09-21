"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ioredis = _interopRequireDefault(require("ioredis"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// config/redisClient.js

_dotenv["default"].config();

//  Check for the presence of `REDIS_URL`
var redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  console.error(" Error: REDIS_URL is not found in the .env file! Ensure it is added.");
  process.exit(1);
}

//  Validate if `REDIS_URL` is valid
try {
  new URL(redisUrl);
} catch (error) {
  process.exit(1);
}

//  Create a Redis client with enhanced options
var redisClient = new _ioredis["default"](redisUrl, {
  tls: redisUrl.startsWith("rediss://") ? {} : undefined,
  // Automatically enable TLS if the URL starts with rediss://
  retryStrategy: function retryStrategy(times) {
    var delay = Math.min(times * 100, 5000); // Gradual increase in delay
    return delay;
  },
  reconnectOnError: function reconnectOnError(err) {
    return true; // Attempt to reconnect on error
  }
});

//  Log Redis events for improved monitoring
redisClient.on("connect", function () {});
redisClient.on("ready", function () {});
redisClient.on("reconnecting", function (time) {});
redisClient.on("error", function (err) {});
redisClient.on("end", function () {});

//  Export the client
var _default = exports["default"] = redisClient;