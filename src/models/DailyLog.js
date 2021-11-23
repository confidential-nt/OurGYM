import mongoose from "mongoose";

const dailyLogSchema = mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  image: { type: String },
});

const DailyLog = mongoose.model("DailyLog", dailyLogSchema);

export default DailyLog;
