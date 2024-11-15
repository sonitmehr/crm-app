const redis = require('redis');
const client = redis.createClient();

client.subscribe('customer_channel');
client.subscribe('order_channel');

client.on('message', (channel, message) => {
  console.log(`Received message on ${channel}: ${message}`);
});
