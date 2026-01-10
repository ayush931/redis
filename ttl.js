import Redis from "ioredis";

const redis = new Redis();

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

  await redis.hset('hfoo', 'hbar', 'hfoobar');  // set the values of one or more fields within a hash
  /**
   * Key: hfoo
   * Field: hbar
   * Value: hfoobar
   */

  await redis.hexpire('hfoo', 20, 'FIELDS', 1, 'hbar'); // Sets an expiration (TTL) of 20 seconds only on the field hbar, not the entire hash.
  /**
   * hfoo (hash key) will still exist
   * hfoo.hbar (field) will expire after 20 seconds
   */

  console.log(await redis.call('httl', 'hfoo', 'FIELDS', 1, 'hbar'));  // shows the time left
  await redis.hpexpire('hfoo', 10 * 1000, 'FIELDS', 1, 'hbar');
  console.log(await redis.call('httl', 'hfoo', 'FIELDS', 1, 'hbar'))
}

main();