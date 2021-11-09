import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    index : {type : Number, required:true, default:1},
    exrname : { type:String, required:true},
    exrtime : {type:Date, required:true, default:"00 : 00 : 00"}
})

const Exercise = mongoose.model("Exercise", exerciseSchema)

export default Exercise;