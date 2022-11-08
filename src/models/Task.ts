import {Schema, model} from "mongoose";

const TaskSchema = new Schema({
    title: {
        type: String,
        require: true,
        lowercase:true
    },
    description: {
        type: String,
        require: true,
        lowercase: true
    }
})

export default model('Task', TaskSchema)