import mongoose from "mongoose";

const timePerWeekSchema = mongoose.Schema({
  exrname: { type: String, required: true },
  exrtime: { type: Date, required: true, default: Date.now },
});

const TimePerWeek = mongoose.model("TimePerWeek", timePerWeekSchema);

export default TimePerWeek;