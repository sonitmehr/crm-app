const redis = require('redis');
const client = redis.createClient();

module.exports.publish = (channel, message) => {
  client.publish(channel, message);
};
