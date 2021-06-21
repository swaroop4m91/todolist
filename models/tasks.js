const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const Tasks=new Schema({
    _id:{
        type:String,
        required:true
    },
    tasks:{
        type:Array,
        required:true
    }
})

exports.Task=mongoose.model('Task',Tasks);