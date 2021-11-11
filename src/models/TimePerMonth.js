import mongoose from "mongoose";

const timePerMonthSchema = mongoose.Schema({
  exrname: { type: String, required: true },
  exrtime: { type: Date, required: true, default: Date.now },
});

const TimePerMonth = mongoose.model("TimePerMonth", timePerMonthSchema);

export default TimePerMonth;