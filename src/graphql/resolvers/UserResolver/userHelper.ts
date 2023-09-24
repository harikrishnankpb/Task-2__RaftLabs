import { UserData } from "@generatedTypes";
import { redisClient } from "../../../utilities/redis";
import User from "../../../models/user"

export const getUserDataFromRedis = async (email: string): Promise<UserData | null> => {  //Helper used to get data from redis 
    const key = `user:${email}`;
    let data = await redisClient.get(key);
    if (!data) { //Data Not found inside the redis cache (Miss)
        console.log("Miss")
        const user: UserData | null = await User.findOne({ email }).select('-password').lean();
        if (!user) return null;
        redisClient.set(key, JSON.stringify(user), {
            EX: 3600,
            NX: true
        });
        return user
    }
    else { //Data found in redis cache (Hit)
        console.log("Hit")
        data = JSON.parse(data);
        return data;
    }
}
export const updateUserRedis = async (user: UserData) => {   //Update the data in redis cache when the user details updated
    const key = `user:${user.email}`;
    redisClient.set(key, JSON.stringify(user), {
        EX: 3600
    });
}


