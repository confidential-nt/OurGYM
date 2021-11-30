import TimePerDay from "../models/TimePerDay";

export const getExerciseInfo = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;

  const timePerDays = await TimePerDay.find({}).populate("user");

  const target = Array.from(timePerDays).filter((el) => {
    return el.user._id.toString() === _id;
  });

  return res.status(201).json(...target);
};
