import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
        required: true
    },
    body: {
        type: String,
        default: "",
        required: true
    },
    labels:{
        type: [String],
        default:[],
        required:false,
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
    ,
    create_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    user: {
        default: "",
        type: String,
        required: true,
    }
})

const Todo = mongoose.models.todos ?? mongoose.model("todos", todoSchema);
export default Todo;