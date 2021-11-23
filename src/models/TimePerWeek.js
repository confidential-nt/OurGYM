import mongoose from "mongoose";

const timePerWeekSchema = mongoose.Schema({
  timePerWeek: [
    {
      week: { type: String },
      total: { type: Number },
      exrcises: [
        {
          exrname: { type: String },
          exrtime: { type: Number, default:0 },
        },
      ],
    },
  ],
});

const TimePerWeek = mongoose.model("TimePerWeek", timePerWeekSchema);

export default TimePerWeek;
