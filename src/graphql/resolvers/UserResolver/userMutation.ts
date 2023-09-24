import { MutationCreateAdminArgs, MutationRegisterUserWithEmailArgs, MutationUpdateUserArgs, ShowUserResponse, Status, UserData } from "@generatedTypes";
import User from "../../../models/user";
import bcrypt from 'bcrypt'
import { ExpressType } from "generatedTypes/commonTypes";
import auth from "../../../utilities/auth";

import { updateUserRedis } from './userHelper'
import { isValidObjectId } from "mongoose";
import validator from 'validator';

export default {

    /* Used to Create Normal user */
    async registerUserWithEmail(_: void, data: MutationRegisterUserWithEmailArgs): Promise<Status> {
        try {
            let email = data.email;
            let exist = await User.exists({ email })
            if (exist)
                return {
                    success: false,
                    msg: 'Email already been taken'
                }
            if (!data.email || !data.password || !data.name || !data.password.match(/^\S{6,15}$/) || !validator.isEmail(data.email)) {
                return {
                    msg: "Invalid Input",
                    success: false,
                }
            };
            let userData: any = data
            userData.role = 1;
            userData.password = await bcrypt.hash(data.password, 10);
            let newUser = await new User(userData).save()
            return {
                success: true,
                msg: "User registered successfully"
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                success: false,
                msg: "Something went wrong"
            }
        }
    },

    /* Used to Create Admin user . Need to pass additional secret key .This is created only for temporary purpose */
    async createAdmin(_: void, data: MutationCreateAdminArgs): Promise<Status> {
        try {
            let email = data.email;
            if (!process.env.ADMIN_SECRET_KEY || data.secretKey != process.env.ADMIN_SECRET_KEY) return ({
                success: false,
                msg: "Invalid secret key"
            });
            if (!data.email || !data.password || !data.name || !data.password.match(/^\S{6,15}$/) || !validator.isEmail(data.email)) {
                return {
                    msg: "Invalid Input",
                    success: false,
                }
            };
            let exist = await User.exists({ email })
            if (exist)
                return {
                    success: false,
                    msg: 'Email already been taken'
                }
            let userData: any = data
            userData.role = 2;
            userData.password = await bcrypt.hash(data.password, 10);
            let newUser = await new User(userData).save()
            return {
                success: true,
                msg: "User registered successfully"
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                success: false,
                msg: "Something went wrong"
            }
        }
    },

    /* Used to Update user . User id and name need to pass */
    async updateUser(_: void, data: MutationUpdateUserArgs, { req }: ExpressType): Promise<ShowUserResponse> {
        let token: any = req.headers.token || '';
        let userInfo = await auth(token, 1);
        try {
            let user: UserData | null;
            if (!data.userId || !isValidObjectId(data.userId)) {
                return {
                    status: {
                        success: false,
                        msg: "Invalid objectId"
                    }
                }
            }
            let userId;
            if (userInfo.role === 1) {
                if (userInfo._id != data.userId) {
                    return {
                        status: {
                            success: false,
                            msg: "Don't have privilege"
                        }
                    }
                }
                userId = userInfo._id
            }
            if (userInfo.role > 1 && data.userId) {
                userId = data.userId;
            }
            user = await User.findByIdAndUpdate(
                userId,
                { name: data.name },
                { new: true }
            ).select('-password').lean();
            if (!user) return {
                status: {
                    success: false,
                    msg: "User not found"
                }
            }
            await updateUserRedis(user);
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