
const mongoose =require("mongoose")

const taskSchema=mongoose.Schema({
    task:{
        type:String,
        required:true,
        default:'aaa'
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
       
    },
    date:{
        type:String,
        required:true,
        default:'aaa'

       
    }
})

module.exports = mongoose.model("task",taskSchema);