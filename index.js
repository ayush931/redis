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

/**
 * Creates a sorted set named sortedSet
 * Adds members with scores
 * Redis automatically sorts by score (ascending)
 */

redis.zadd('sortedSet', 1, 'one', 2, 'docs', 4, 'quatro', 3, 'three');

/**
 * Fetches elements from index 0 to 3 (inclusive)
 * Sorted by lowest → highest score
 * Includes scores along with members
 */
redis.zrange('sortedSet', 0, 3, 'WITHSCORES').then((element) => {
  console.log(element)
})
