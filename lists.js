/**
 * What is a Redis List?

 * An ordered collection of strings
 * Implemented as a linked list / quicklist
 * Allows duplicate values
 * Maintains insertion order
 * tasks → ["task1", "task2", "task3"]
 */

/**
 * Why Use Redis Lists?

 * Fast insertion/removal from both ends
 * Ideal for queues & stacks
 * Supports blocking operations
 * Preserves order automatically
 */

/**
 * When to Use Redis Lists

 * Use When:

 * Message queues
 * Task/job processing
 * Producer–consumer model
 * Recent activity logs
 * Stack or queue implementation

 * Avoid When:

 * Need sorting → Use ZSET
 * Unique values → Use SET
 * Large-scale streams → Use Streams
 */

/**
 * | Feature       | List | Set |
| ------------- | ------|------|
| Order         | ✅    | ❌   |
| Duplicates    | ✅    | ❌   |
| Queue support | ✅    | ❌   |

 */

/**
 * | Feature  | List         | ZSET        |
| -------- | ------------ | ----------- |
| Ordering | Insert order | Score-based |
| Use case | Queues       | Rankings    |

 */

/**
 * Internals (Interview Point):-

 * Implemented using Quicklist
 * Optimized for head/tail operations
 * O(1) push/pop
 * Middle access is O(n)
 */

/**
 * Best Practices

 * Use LPUSH + RPOP or RPUSH + LPOP consistently
 * Use LTRIM to control size
 * Avoid very large lists
 * Use blocking ops for workers
 */

/**
 * Common Mistakes

 * Using list for sorted ranking
 * Not trimming growing lists
 * Using LPOP in high concurrency without BLPOP
 * Using list instead of Streams for reliable messaging
 */

import Redis from "ioredis";
const redis = new Redis();

async function main() {
  const numbers = [1, 2, 3, 4, 5];
  await redis.lpush('user-lists', numbers);   // Prepend one or multiple elements to a list

  const popped = await redis.lpop('user-lists');    // Remove and get the first elements in a list
  console.log(popped);

  const all = await redis.lrange('user-lists', 0, -1);  // giving all the elements from 0th index in descending order, Get a range of elements from a list

  console.log(all);

  const position = await redis.lpos('user-lists', 4);   // giving position or index of the asked element
  console.log(position);

  setTimeout(() => {
    redis.duplicate().lpush('block-lists', 'hello');
    // duplicate -> Create a new instance with the same options as the current one.
  }, 1200)

  const blockedPopped = await redis.blpop('block-lists', 0) // Remove and get the first element in a list, or block until one is available
  console.log(blockedPopped);
}

main();