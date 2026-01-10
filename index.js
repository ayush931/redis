const Redis = require('ioredis');

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

// TTL -> time to live in redis

async function main() {

  await redis.set('foo', 'bar');
  await redis.expire('foo', 10);  // expires the data after 10 seconds
  console.log(await redis.ttl('foo'));

  await redis.set('foo', 'bar', 'EX', 20);
  console.log(await redis.ttl('foo'));

  await redis.expireat("foo", Math.round(Date.now() / 1000) + 30);
  console.log(await redis.ttl("foo")); // a number smaller or equal to 30

  await redis.expireat('foo', Math.round(Date.now() / 1000) + 40, 'XX'); // XX will not create a new key
  console.log(await redis.ttl('foo'));

  console.log(new Date((await redis.expiretime('foo')) * 1000)); // gives the expiry of the data

  await redis.pexpire('foo', 10 * 1000);  // unit in millisecond for pexpire
  console.log(await redis.ttl('foo'));  // shows the ttl time

  await redis.persist('foo'); // remove the existing timeout from the foo.
  console.log(await redis.ttl('foo'));
}

main();
