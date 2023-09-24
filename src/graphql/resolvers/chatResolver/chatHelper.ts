
import { io } from '../../../index'

export const sendMessage = async (message: string, email: string) => {   //Update the data in redis cache when the user details updated
    try {
        io.emit('message', { email, message });
    } catch (error) {
        throw new Error('Error while sending message')
    }
}
export const sendMessageToRoom = async (message: string, email: string, room: string) => {
    try {
        io.to(room).emit('room-message', { email, message }); // Send the message to the specified room
    } catch (error) {
        throw new Error('Error while sending message');
    }
}
