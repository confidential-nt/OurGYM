import mongoose from "mongoose";

const timePerWeekSchema = mongoose.Schema({
  week: { type: String }, //2021. 49th
  total: { type: Number, default: 0 },
  exercises: [
    {
      exrname: { type: String },
      exrtime: { type: Number, default: 0 },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const TimePerWeek = mongoose.model("TimePerWeek", timePerWeekSchema);

export default TimePerWeek;
