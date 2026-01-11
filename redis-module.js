// A Redis Module is a plug-in that extends Redis with new data types, commands, and capabilities beyond the core ones (String, Hash, List, Set, ZSet).

/**
 * Core Redis is:

 * Extremely fast
 * Simple data structures
 * But modern apps need:
 * Search
 * Analytics
 * JSON storage
 * Time-series data
 * Graph relationships
 * Instead of bloating Redis core, Redis introduced modules.
*/

/*
 * | Core Redis                    | Redis Modules                   |
| ----------------------------- | ------------------------------- |
| String, Hash, List, Set, ZSet | JSON, Search, TimeSeries, Graph |
| Built-in                      | Optional                        |
| Always available              | Must be enabled                 |
| Simple operations             | Advanced queries & indexing     |

*/

/**
 * RedisJSON

 * Store & query JSON natively
 * No serialization / deserialization
 * Partial updates
 * Perfect for API
 
 * Use when
 
 * Storing API responses
 * User profiles
 * Config objects
 */

/**
 * RediSearch
 * Full-text search + indexing

 * Why
 * Search inside Redis
 * Super fast filtering & ranking

 * Use when
 * Product search
 * User search
 * Auto-complete
 */

/**
 * RedisTimeSeries
 * Time-series data (metrics, logs)

 * Why
 * Optimized for timestamp data
 * Built-in aggregation
 * Use when
 * Monitoring
 * Analytics
 * IoT data
 */

/**
 * RedisGraph
 * Graph database inside Redis

 * Why
 * Relationship-heavy data
 * Cypher-like queries

 * Use when
 * Social networks
 * Recommendation systems
 */

/**
 *  Bloom (Probabilistic)
 *  Space-efficient checks

 * Why
 * Check if something might exist
 * Extremely memory-efficient
 
 * Use when
 * Spam detection
 * Cache protection
 * Duplicate checks
 */

/**
 * Use Core Redis if:

 * Sessions
 * OTPs
 * Rate limiting
 * Caching
 * Queues
 * Leaderboards

 * Use Modules if:
 * You need search
 * You store JSON
 * You do analytics
 * You need relationships
 */

import { Redis } from 'ioredis';
const redis = new Redis();

async function main() {
  // redis call() can be used to call arbitrary Redis commands
  // The first parameter is the command line and rest are arguments.

  await redis.call('JSON.SET', 'doc', '$', '{"f1": {"a": 1}, "f2": {"a": 2}}');
  const json = await redis.call('JSON.GET', 'doc', '$..f1');
  console.log(json);
}

main();
