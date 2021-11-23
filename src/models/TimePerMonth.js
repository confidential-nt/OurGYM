import mongoose from "mongoose";

const timePerMonthSchema = mongoose.Schema({
  timePerMonth: [
    {
      month: { type: String },
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

const TimePerMonth = mongoose.model("TimePerMonth", timePerMonthSchema);

export default TimePerMonth;
