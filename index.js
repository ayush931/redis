import Redis from 'ioredis';

// By default, it will connect the localhost:6379
const redis = new Redis();

redis.set('myKey', 'value');  // Returns a promise which resolves OK

// ioredis supports Nodejs callback style
redis.get('myKey', (err, result) => {
  if (err) {
    console.error(err);
  }
  else {
    console.log(result);
  }
})

// or returns a promise if the last argument is not a function

redis.get('myKey').then((result) => {
  console.log(result);
});
