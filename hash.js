/**
 * What is a Redis Hash?

 * A Redis data type to store multiple field–value pairs under one key
 * Similar to an object / dictionary / map
 * Ideal for representing entities
 * user:1 → { name: "Ayush", age: "22", role: "admin" }
 */

/**
 * Why Use Redis Hash?
 
 * Stores related data together
 * More memory efficient than multiple string keys
 * Allows partial updates
 * Faster reads/writes for structured data
 */

/**
 * Expiry & TTL in Hash:-
 
 * TTL applies to the entire hash key
 * Not individual fields (Redis ≤6)
 */

/**
 * When to Use Redis Hash

 * Use When: 

 * User profile data
 * Session metadata
 * Product details
 * Configurations
 * Counters per entity

 * Avoid When:

 * Single value only → Use String
 * Ordered data → Use ZSET
 * Queues → Use List / Stream
 */

/**
 * Internals (Interview Point):- 
 
 * Implemented as hash table
 * Optimized for small objects
 * O(1) average complexity
 * Memory efficient for many small fields
 */

/**
 * Best Practices:- 
 
 * Use one hash per entity
 * Keep field names short
 * Apply TTL at key level
 * Avoid deeply nested JSON
 * Use prefixes (user:, product:)
 */

/**
 * Common Mistakes:-

 * Using string JSON instead of hash
 * Forgetting to set expiry
 * Storing unrelated fields together
 * Using hash for sorted data
 */

import Redis from "ioredis";
const redis = new Redis();

async function main() {
  const user = {
    name: 'ayush',
    age: 25,
    description: 'I am programmer ->'
  }

  await redis.hset('user-hash', user);

  const name = await redis.hget('user-hash', 'name');
  console.log(name);

  const age = await redis.hget('user-hash', 'age');
  console.log(age)

  const all = await redis.hgetall('user-hash');
  console.log(all);

  await redis.hdel('user-hash', ['name', 'description']);

  const exists = await redis.hexists('user-hash', 'name');
  console.log(exists);

  const newAge = await redis.hincrby('user-hash', 'age', 1);
  console.log(newAge);

  await redis.hsetnx('user-hash', 'age', 30); // Set the value of a hash field, only if the field does not exist
  console.log(await redis.hget('user-hash', 'age')) // get original value, as age already exists

}

main();