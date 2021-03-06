import Redis from 'ioredis';

class Cache {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      PORT: process.env.REDIS_PORT,
      keyPrefix: 'cache:',
    });
  }

  set(key, value) {
    // set expiration time to 24 hours
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  invalidade(key) {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.redis.keys(`cache:${prefix}:*`);
    const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));
    if (keysWithoutPrefix.length > 0) {
      return this.redis.del(keysWithoutPrefix);
    }
    return null;
  }
}

export default new Cache();
