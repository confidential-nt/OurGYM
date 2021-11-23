import mongoose from "mongoose";

const timePerWeekSchema = mongoose.Schema({
  timePerWeek: [
    {
      week: { type: String },
      total: { type: Number, default:0},
      exrcises: [
        {
          exrname: { type: String },
          exrtime: { type: Number, default:0 },
        },
      ],
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const TimePerWeek = mongoose.model("TimePerWeek", timePerWeekSchema);

export default TimePerWeek;
