import Redis from "ioredis";
const redis = new Redis();

/**
 * Basic Redis data type -> Stores binary-safe values
 * Can store: Text, Numbers, JSON, Binary data
 * Max size per key: 512 MB
 */

/**
 * Why Use Redis Strings?

 * Very fast (in-memory), Atomic operations, Simple key–value structure, Supports TTL (expiry), Foundation of most Redis use cases
 */

/**
 * When to Use Redis Strings
 * Use When: OTP storage, Session tokens, API caching, Counters, Feature flags, Distributed locks
 * Avoid When: Multiple fields → Use Hash, Ordered data → Use ZSET, Queue → Use List / Stream
 */

/**
 * | Feature           | String       | Hash                      |
| ----------------- | ------------  | ----------------------------|
| Structure         | Single value  | Multiple fields             |
| Partial update    | ❌            | ✅                          |
| Memory efficiency | ❌            | ✅ (many fields)            |
| Field TTL         | ❌            | ❌ (Redis 7+ supports it)   |

 */

/**
 * Best Practices: Always use TTL for cache/OTP, Use key prefixes, otp, session, cache, Keep values small, Do not store huge JSON blobs, Redis ≠ Primary Database
 */

/**
 * Common Mistakes: No expiry on cache, Using string instead of hash, Large data storage, Using Redis as permanent DB
 */

async function main() {
  const user = {
    name: 'bob',
    age: 20,  // the value of redis key cannot be a number, ioredis will convert into string anyway
    description: 'I am programmer'
  }

  await redis.mset(user);

  const name = await redis.mget('name');
  console.log(name) // ['bob'] in array

  const age = await redis.get('age');
  console.log(typeof age) // return 20 but as a string

  const detail = await redis.mget('name', 'age', 'description');
  console.log(detail);

  await redis.del(['name', 'description']);

  const exists = await redis.exists('name')
  console.log(exists) // 0 means false and 1 means true

  await redis.incrby('age', 1);
  const newAge = await redis.get('age');
  console.log(newAge);

  await redis.set('key_with_ttl', 'hey', 'EX', 1000);
  const ttl = await redis.ttl('key_with_ttl');
  console.log(ttl)
}

main();