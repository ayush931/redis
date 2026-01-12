/**
 * Pub/Sub (Publish–Subscribe) is a real-time messaging pattern where:

 * Publishers send messages to a channel
 * Subscribers listen to that channel
 * Messages are delivered instantly
 * No message storage (important!)
 * Publisher doesn’t know who is listening
 * Subscribers don’t know who published
 * Loose coupling = scalable systems
 */

/**
 * | Feature             | Redis Pub/Sub   |
| ------------------- | --------------- |
| Message persistence | ❌ No            |
| Guaranteed delivery | ❌ No            |
| Ordering            | ✅ Per publisher |
| Fan-out             | ✅               |
| Latency             | ⚡ Very low      |
| Replay messages     | ❌ Impossible    |

 * If a subscriber is offline, it misses the message.
 */

/*
 * Real-world use cases (good fit)

 * Live notifications
 * WebSocket fan-out
 * Real-time dashboards
 * Chat typing indicators
 * Cache invalidation signals
 */

/**
 * When NOT to use Redis Pub/Sub

 * Order processing
 * Payment events
 * Email sending
 * Anything that must not be lost

 * Why?
 * No retry
 * No durability
 * No acknowledgment
 */

/**
 * | Feature           | Pub/Sub | Streams |
| ----------------- | ------- | ------- |
| Persistence       | ❌       | ✅       |
| Consumer groups   | ❌       | ✅       |
| Retry / ACK       | ❌       | ✅       |
| Offline consumers | ❌       | ✅       |
| Complexity        | Simple  | Medium  |


 * Real-time only → Pub/Sub
 * Event processing → Streams / RabbitMQ / Kafka
 */

/**
 * | Redis Pub/Sub | RabbitMQ     |
| ------------- | ------------ |
| In-memory     | Durable      |
| Ultra-fast    | Reliable     |
| No retries    | ACK / Retry  |
| Simple        | Feature-rich |

 */

/**
 * Common mistakes:

 * Using Pub/Sub for background jobs
 * Expecting message delivery guarantees
 * Using one Redis connection for both pub & sub
 * Always use separate connections
 */


import { Redis } from 'ioredis';
const redis = new Redis();

setInterval(() => {
  const message = { foo: Math.random() };

  // publish to my-channel-1 or my-channel-2 randomly.
  const channel = `my-channel-${1 + Math.round(Math.random())}`;

  // message can either be string or can be buffer
  redis.publish(channel, JSON.stringify(message));
  console.log('Published %s to $s', message, channel);
}, 1000);
