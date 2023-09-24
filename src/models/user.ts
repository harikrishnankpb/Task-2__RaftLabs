import { Schema, model } from "mongoose";

const schemaOptions = {
    timestamps: true
}

const schema = new Schema({
    email: {
        index: true,
        unique: true,
        type: String,
    },
    name: String,
    password: String,
    role: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
    },
    /*
    1 - registered user
    2 - Admin
    */
},
    schemaOptions
);

export default model('User', schema);