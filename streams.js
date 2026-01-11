/**
 * What is a Redis Stream?

 * An append-only log data structure
 * Stores events as time-ordered entries
 * Each entry has:
 * ID (timestamp-based)
 * Field–value pairs
 * Designed for reliable messaging
 * orders → 1590000000000-0 { orderId: 123, status: "created" }
 */

/**
 * Why Use Redis Streams?

 * Persistent & reliable messaging
 * Supports multiple consumers
 * Message acknowledgement
 * Replay & history support
 * Better alternative to Lists for queues
 */

/**
 * When to Use Redis Streams
 
 * Use When:

 * Event-driven architecture
 * Background job processing
 * Audit logs
 * Microservices communication
 * Reliable queues

 * Avoid When:

 * Simple FIFO queue → Use List
 * Pub-only (no persistence) → Use Pub/Sub
 * Simple cache → Use String
 */

/**
 * | Feature         | Streams | Lists |
| --------------- | ------- | ----- |
| Persistence     | ✅       | ❌     |
| Consumer groups | ✅       | ❌     |
| Replay          | ✅       | ❌     |
| Reliability     | ✅       | ❌     |

 */

/**
 * | Feature         | Streams | Pub/Sub |
| --------------- | ------- | ------- |
| Message storage | ✅       | ❌       |
| Replay          | ✅       | ❌       |
| Ack support     | ✅       | ❌       |

 */

/**
 * Internals (Interview Point)

 * Append-only log
 * Stored in radix tree
 * O(1) append
 * Efficient range reads
 */

/**
 * Best Practices

 * Always use consumer groups for workers
 * Acknowledge messages (XACK)
 * Monitor pending messages
 * Trim streams to avoid memory growth
 */

/**
 * Common Mistakes

 * Forgetting XACK
 * Not trimming streams
 * Using Streams like Pub/Sub
 * Single consumer for high throughput
 */

import { Redis } from "ioredis";

const redis = new Redis();
const pub = new Redis();
const sub = new Redis();

// usage 1 as a message hub

const processMessage = (message) => {
  console.log("Id: %s. Data: %O", message[0], message[1])
};

async function listenForMessage(lastId = '$') {
  // 'results' is an array, each elements of which corresponds to a key
  // Because we only listen to one key here, `results` only contains a single element.

  const results = await sub.xread('BLOCK', 0, 'STREAMS', 'user-streams', lastId);
  const [key, messages] = results[0];

  messages.forEach(processMessage);

  await listenForMessage(messages[messages.length - 1][0]);
}

listenForMessage();

setInterval(() => {
  pub.xadd('user-streams', '*', 'name', 'john', 'age', '20');
}, 1000);

// usage 2 as a list

async function main() {
  redis
    .pipeline()
    .xadd('list-stream', '*', 'id', 'item1')
    .xadd('list-stream', '*', 'id', 'item1')
    .xadd('list-stream', '*', 'id', 'item1')
    .exec()

  const items = await redis.xrange('list-stream', '-', '+', 'COUNT', 2);
  console.log(items);
}

main();
