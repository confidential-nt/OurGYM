import mongoose from "mongoose";

const dailyLogSchema = mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  date: { type: Date, required: true, default: Date.now },
  image: { type: String },
});

const DailyLog = mongoose.model("DailyLog", dailyLogSchema);

export default DailyLog;
