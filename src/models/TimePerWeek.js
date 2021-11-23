import mongoose from "mongoose";

const timePerWeekSchema = mongoose.Schema({
  timePerWeek: [
    {
      week: { type: String, required: true },
      total: { type: Number, required: true },
      exrcises: [
        {
          exrname: { type: String, required: true },
          exrtime: { type: Number, required: true, default:0 },
        },
      ],
    },
  ],
});

const TimePerWeek = mongoose.model("TimePerWeek", timePerWeekSchema);

export default TimePerWeek;
