/**
 * What is a Redis Sorted Set or ZSET?

 * A collection of unique members
 * Each member has an associated score (number)
 * Automatically sorted by score (ascending)
 * Combination of Set + Ranking
 * leaderboard → { (user1, 100), (user2, 200) }
 */

/**
 * Why Use Redis Sorted Sets?

 * Maintains ordered data
 * Fast ranking & range queries
 * Supports score-based logic
 * Ideal for real-time ranking systems
 */

/**
 * When to Use Redis Sorted Sets
 
 * Use When:

 * Leaderboards
 * Ranking systems
 * Rate limiting (timestamp as score)
 * Delayed job scheduling
 * Priority queues

 * Avoid When:
  
 * Order doesn’t matter → Use Set
 * FIFO queue → Use List / Stream
 * Key-value pairs → Use Hash
 */

/**
 * | Feature | ZSET | SET |
| ------- | ---- | --- |
| Order   | ✅    | ❌   |
| Score   | ✅    | ❌   |
| Ranking | ✅    | ❌   |

 */

/**
 * | Feature    | ZSET        | LIST         |
| ---------- | ----------- | ------------ |
| Ordering   | Score-based | Insert order |
| Duplicates | ❌           | ✅            |

 */

/**
 * Internals (Interview Point)

 * Implemented using:
 * Skip List
 * Hash Table
 * O(log N) insert/delete
 * O(log N + M) range queries
 */

/**
 * Best Practices

 * Keep scores numeric & meaningful
 * Use timestamps for time-based logic
 * Use ZREMRANGEBYSCORE for cleanup
 * Avoid very large sorted sets without pruning
 */

/**
 * Best Practices

 * Keep scores numeric & meaningful
 * Use timestamps for time-based logic
 * Use ZREMRANGEBYSCORE for cleanup
 * Avoid very large sorted sets without pruning
 */

import Redis from "ioredis";
const redis = new Redis();

async function main() {
  const scores = [
    { name: 'bob', score: 80 },
    { name: 'jeff', score: 59.5 },
    { name: 'tom', score: 100 },
    { name: 'alex', score: 99.5 }
  ]

  await redis.zadd('user-zset', ...scores.map(({ name, score }) => [score, name])) // in zadd it should be in reverse order

  console.log(await redis.zrange('user-zset', 2, 3));
  console.log(await redis.zrange('user-zset', 2, 3, 'WITHSCORES'));
  console.log(await redis.zrange('user-zset', 2, 3, 'REV'));
  console.log(await redis.zrange('user-zset', 80, 100, 'BYSCORE'));
}

main();