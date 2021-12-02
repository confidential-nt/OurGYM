import DailyLog from "../models/DailyLog";
import User from "../models/User";

// export const getDailyLog = async (req, res) => {
//   const { _id } = req.session.user;

//   const user = await User.findById(_id).populate("dailyLogs");

//   return res.render("dailyLog", {
//     pageTitle: "운동 일지",
//     dailyLogs: user.dailyLogs.sort((a, b) => b.date - a.date),
//   });
// };

// export const postDailyLog = async (req, res) => {
//   const isHeroku = process.env.NODE_ENV === "production";

//   const {
//     body: { content },
//     file,
//     session: {
//       user: { _id },
//     },
//   } = req;

//   const user = await User.findById(_id);

//   const dailyLog = await DailyLog.create({
//     content,
//     author: _id,
//     image: file ? (isHeroku ? file.location : file.path) : "",
//   });

//   user.dailyLogs.push(dailyLog._id);
//   await user.save();

//   return res.redirect("/users/daily-log");
// };

// export const deleteDailyLog = async (req, res) => {
//   const { id } = req.params;

//   await DailyLog.findByIdAndDelete(id);

//   return res.redirect("/users/daily-log");
// };

// export const getDailyLogInfo = async (req, res) => {
//   const { id } = req.params;

//   const dailyLog = await DailyLog.findById(id);

//   return res.status(201).json(dailyLog);
// };

// export const editDailyLog = async (req, res) => {
//   const isHeroku = process.env.NODE_ENV === "production";

//   const {
//     body: { content },
//     file,
//     session: {
//       user: { _id },
//     },
//     params: { id },
//   } = req;

//   const user = await User.findById(_id);

//   const dailyLog = await DailyLog.findById(id);

//   const updatedDailyLog = await DailyLog.findByIdAndUpdate(id, {
//     content,
//     author: _id,
//     image: file ? (isHeroku ? file.location : file.path) : dailyLog.image,
//   });

//   return res.redirect("/users/daily-log");
// };

class DailyLogController {
  getDailyLog = async (req, res) => {
    const { _id } = req.session.user;

    const user = await User.findById(_id).populate("dailyLogs");

    return res.render("dailyLog", {
      pageTitle: "운동 일지",
      dailyLogs: user.dailyLogs.sort((a, b) => b.date - a.date),
    });
  };

  postDailyLog = async (req, res) => {
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

  deleteDailyLog = async (req, res) => {
    const { id } = req.params;

    await DailyLog.findByIdAndDelete(id);

    return res.redirect("/users/daily-log");
  };

  getDailyLogInfo = async (req, res) => {
    const { id } = req.params;

    const dailyLog = await DailyLog.findById(id);

    return res.status(201).json(dailyLog);
  };

  editDailyLog = async (req, res) => {
    const isHeroku = process.env.NODE_ENV === "production";

    const {
      body: { content },
      file,
      session: {
        user: { _id },
      },
      params: { id },
    } = req;

    const user = await User.findById(_id);

    const dailyLog = await DailyLog.findById(id);

    const updatedDailyLog = await DailyLog.findByIdAndUpdate(id, {
      content,
      author: _id,
      image: file ? (isHeroku ? file.location : file.path) : dailyLog.image,
    });

    return res.redirect("/users/daily-log");
  };
}

export default DailyLogController;
