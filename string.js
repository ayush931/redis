import Redis from "ioredis";
const redis = new Redis();

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