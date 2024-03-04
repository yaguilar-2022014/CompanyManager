import mongoose, { model } from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: [6, 'Password must be 6 character'],
        required: true
    },
    role:{
        type: String,
        uppercase: true,
        enum: ['ADMIN'],
        required: true,
        default: 'ADMIN'
    }
})

export default model('user', userSchema)