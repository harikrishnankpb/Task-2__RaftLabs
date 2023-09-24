import { QueryLoginUserWithEmailArgs, QueryShowUserArgs, ShowUserResponse, TokenResponse, UserData } from "@generatedTypes";
import User from "../../../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { ExpressType } from "generatedTypes/commonTypes";
import auth from "../../../utilities/auth";
import { getUserDataFromRedis } from './userHelper'

interface UserDatas {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
}

export default {

    /* Login for both normal user and admin */
    async loginUserWithEmail(_: void, data: QueryLoginUserWithEmailArgs): Promise<TokenResponse> {
        try {
            let dbUser: UserDatas | null = await User.findOne({ email: data.email })
            if (!dbUser)
                return {
                    success: false,
                    msg: "Invalid email or password"
                }
            if (!await bcrypt.compare(data.password, (dbUser.password || '')))
                return {
                    success: false,
                    msg: "Invalid email or password"
                }
            let maxExp = '10d'
            let token = jwt.sign({ _id: dbUser._id, email: dbUser.email, role: dbUser.role }, process.env.JWT_SECRET || '', { expiresIn: maxExp })
            return {
                success: true,
                token,
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                success: false,
                msg: "Something went wrong"
            }
        }
    },

    /* Used to show user data , by passing user email .  In here I used Redis for Caching */
    async showUser(_: void, input: QueryShowUserArgs, { req }: ExpressType): Promise<ShowUserResponse> {
        let token: any = req.headers.token || '';
        let userInfo = await auth(token, 1);
        try {
            let email = input.email
            console.log(email)
            let user: UserData | null
            if (userInfo.role > 1 && email) {
                user = await getUserDataFromRedis(email);
            }
            else {
                user = await getUserDataFromRedis(userInfo.email);
            }
            if (!user) {
                return {
                    status: {
                        success: false,
                        msg: "User not found"
                    }
                }
            }
            return {
                status: {
                    success: true,
                    msg: "Success"
                },
                userData: user
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                status: {
                    success: false,
                    msg: "Something went wrong"
                }
            }
        }
    },
}