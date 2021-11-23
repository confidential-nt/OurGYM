import mongoose from "mongoose";

const timePerMonthSchema = mongoose.Schema({
  timePerMonth: [
    {
      month: { type: String, required: true },
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

const TimePerMonth = mongoose.model("TimePerMonth", timePerMonthSchema);

export default TimePerMonth;
