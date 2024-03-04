import mongoose, { Schema, model } from "mongoose"

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    impact:{
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        required: true
    },
    trajectory:{
        type: Number,
        required: true
    },
    category:{
        type: Schema.ObjectId,
        ref: 'category',
        required: true
    }
})

export default model('company', companySchema)
