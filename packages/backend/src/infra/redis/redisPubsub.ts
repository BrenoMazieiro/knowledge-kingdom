import { createRedisClient } from './redisClient';

export const createRedisPubSub = () => {
  const publisher = createRedisClient();
  const subscriber = createRedisClient();

  return {
    publisher,
    subscriber,
    publish: async (channel: string, message: string): Promise<void> => {
      await publisher.publish(channel, message);
    },
    subscribe: async (channel: string, callback: (message: string) => void): Promise<void> => {
      await subscriber.subscribe(channel);
      subscriber.on('message', (ch, msg) => {
        if (ch === channel) {
          callback(msg);
        }
      });
    },
  };
};
