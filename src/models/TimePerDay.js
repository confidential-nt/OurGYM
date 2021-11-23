import mongoose from "mongoose";

const timePerDaySchema = mongoose.Schema({
  timePerDay: [
    {
      date: { type: Date },
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

const TimePerDay = mongoose.model("TimePerDay", timePerDaySchema);

export default TimePerDay;
