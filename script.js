const Redis = require('ioredis');

const redis = new Redis();

redis.get('foo', (err, result) => {
  console.log(result);
})

redis.get('foo1', (err, result) => {
  console.log(result);
})
