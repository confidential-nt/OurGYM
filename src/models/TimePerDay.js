import mongoose from "mongoose";

const timePerDaySchema = mongoose.Schema({
  date: { type: String, required: true },
  total: { type: Number, default: 0 },
  exercises: [
    {
      exrname: { type: String },
      exrtime: { type: Number, default: 0 },
      
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const TimePerDay = mongoose.model("TimePerDay", timePerDaySchema);

export default TimePerDay;
