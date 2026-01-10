/**
 * What is a Redis Set?

 * An unordered collection of unique strings
 * Automatically removes duplicates
 * Optimized for membership checks
 * tags → { "nodejs", "redis", "backend" }
 */

/**
 * 2. Why Use Redis Sets?

 * Guarantees uniqueness
 * Very fast O(1) operations
 * Excellent for relationships & grouping
 * Supports set mathematics
 */

/**
 * When to Use Redis Sets
 
 * Use When:

 * Unique user IDs
 * Tags & categories
 * Followers / following
 * Permissions & roles
 * Deduplication logic

 * Avoid When:

 * Order matters → Use List / ZSET
 * Need ranking → Use ZSET
 * Need key-value pairs → Use Hash
 */

/**
 * | Feature          | Set  | List |
| ---------------- | ---- | ---- |
| Order            | ❌    | ✅    |
| Duplicates       | ❌    | ✅    |
| Membership check | O(1) | O(n) |

 */

/**
 * | Feature | Set | ZSET |
| ------- | --- | ---- |
| Score   | ❌   | ✅    |
| Ranking | ❌   | ✅    |

 */

/**
 * Internals (Interview Point)

 * Implemented using hash table
 * O(1) average complexity
 * Memory efficient for unique elements
 * Unordered by design
 */

/**
 * Best Practices

 * Use meaningful key names
 * Use sets for membership logic
 * Avoid storing large objects
 * Combine with TTL where applicable
 */

import Redis from "ioredis";
const redis = new Redis();

async function main() {
  const numbers = [1, 2, 3, 4, 5];
  await redis.sadd('user-sets', numbers);  // Add one or more members to a set
  
  const elementCount = await redis.scard('user-sets');  // Get the number of members in a set
  console.log(elementCount);

  await redis.sadd('user-sets', 6);
  const newElementCount = await redis.scard('user-sets');
  console.log(newElementCount);

  const isMember = await redis.sismember('user-sets', 3);
  console.log(isMember);  // 1 means true and 0 means false
}

main()