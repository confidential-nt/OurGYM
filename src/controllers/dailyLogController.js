import DailyLog from "../models/DailyLog";
import User from "../models/User";

export const getDailyLog = async (req, res) => {
  const { _id } = req.session.user;

  const user = await User.findById(_id);

  const dailyLogs = user.dailyLogs;

  return res.render("dailyLog", { pageTitle: "운동 일지", dailyLogs });
};

export const postDailyLog = async (req, res) => {
  const isHeroku = process.env.NODE_ENV === "production";

  const {
    body: { content },
    file,
    session: {
      user: { _id },
    },
  } = req;

  const user = await User.findById(_id);

  const dailyLog = await DailyLog.create({
    content,
    author: _id,
    image: file ? (isHeroku ? file.location : file.path) : "",
  });

  user.dailyLogs.push(dailyLog._id);
  await user.save();

  return res.redirect("/users/daily-log");
};
