import mongoose from "mongoose";

const timePerDaySchema = mongoose.Schema({
  date: { type: String, required: true },
  total: { type: Number, default: 0 }, // 하루동안 한 총  운동 시간량
  exercises: [
    {
      exrname: { type: String },
      exrtime: { type: Number, default: 0 },
      exrmetas: [
        {
          exrmetaName: { type: String },
          exrmetaCount: { type: Number, default: 0 },
          exrmetaOther: { type: String },
        },
      ],
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const TimePerDay = mongoose.model("TimePerDay", timePerDaySchema);

export default TimePerDay;
