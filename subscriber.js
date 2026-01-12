import Redis from "ioredis";
const redis = new Redis();

redis.subscribe('my-channel-1', 'my-channel-2', (err, count) => {
  if (err) {
    // Just like other command, subscribe can fail
    console.log('Failed to subscribe: %s', err.message);
  }

  // `Count represent the number of channels this client are currently subscribed`;
  else {
    console.log(`Subscribed successfully! This client currently subscribed to ${count} channel`);
  }
})

redis.on('message', (channel, message) => {
  console.log(`Received ${message} from ${channel}`);
});

// There is also an event called messageBuffer, which is same as the message;
// It returns buffer instead of message;
// It's useful when you have binary data;

redis.on('messageBuffer', (channel, message) => {
  // Both channel and message are buffer
  console.log(channel, message);
})
