import mongoose from "mongoose";

const timePerMonthSchema = mongoose.Schema({
  month: { type: String },
  total: { type: Number, default: 0 },
  exercises: [
    {
      exrname: { type: String },
      exrtime: { type: Number, default: 0 },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const TimePerMonth = mongoose.model("TimePerMonth", timePerMonthSchema);

export default TimePerMonth;
