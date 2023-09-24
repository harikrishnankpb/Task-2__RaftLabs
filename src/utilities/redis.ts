require('dotenv').config();
import { createClient } from "redis";


//Redis client is created and exported .
export let redisClient: any

export const connect = async () => {
    redisClient = createClient({
        url: process.env.REDIS_URL,
    });
    redisClient.on('error', (err: any) => {
        console.error('Redis client Error:', err);
    })
    await redisClient.connect();
}

