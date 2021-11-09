import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    
    exrname : { type:String, required:true},
    exrtime : {type:Date, required:true, default:Date.now}
})

const Exercise = mongoose.model("Exercise", exerciseSchema)

export default Exercise;