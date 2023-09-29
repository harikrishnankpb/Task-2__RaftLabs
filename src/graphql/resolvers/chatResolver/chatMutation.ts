import { MutationSendMessageArgs, MutationSendMessageToRoom_Room1Args, Status } from "@generatedTypes";
import { ExpressType } from "generatedTypes/commonTypes";
import auth from "../../../utilities/auth";
import { sendMessage, sendMessageToRoom } from './chatHelper'

export default {
    async sendMessage(_: void, input: MutationSendMessageArgs, { req }: ExpressType): Promise<Status> {  //Used to send message
        let token: any = req.headers.token || '';
        let userInfo = await auth(token, 1);
        try {
            let message = input.message;
            let email = userInfo.email;
            sendMessage(message, email);
            return {
                success: true,
                msg: "Message send successfully"
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                success: false,
                msg: "Something went wrong"
            }
        }
    },
    async sendMessageToRoom_Room1(_: void, input: MutationSendMessageToRoom_Room1Args, { req }: ExpressType): Promise<Status> { //Send message to room
        let token: any = req.headers.token || '';
        let userInfo = await auth(token, 1);
        try {
            let message = input.message;
            let email = userInfo.email;
            let room = 'room-1' //I just hardcoded room name for front end-simplicity
            sendMessageToRoom(message, email, room);
            return {
                success: true,
                msg: "Message sent successfully"
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                success: false,
                msg: "Something went wrong"
            }
        }
    },
}