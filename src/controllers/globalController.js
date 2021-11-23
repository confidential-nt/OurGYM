import User from "../models/User";
import TimePerDay from "../models/TimePerDay";
// import TimePerWeek from "../models/TimePerWeek";
// import TimePerMonth from "../models/TimePerMonth";

export const getHome = async (req, res) => {
  try {
    const id = req.session.user._id;
    const user = await User.findById(id);
    const timePerDay = await TimePerDay.findById(id);
    console.log(timePerDay);
    // const timePerWeek = await TimePerWeek.findById(id);
    // const timePerMonth = await TimePerMonth.findById(id);
    return res.render("home", { pageTitle: "Our GYM", user, timePerDay });
  } catch (error) {
    console.log(error);
    return res.render("home", { pageTitle: "Our GYM" });
  }
};

export const postHome = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { exrname },
  } = req;
  try {
    await User.findByIdAndUpdate(_id, { $push: { exercises: { exrname } } });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).redirect("/");
  }
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  return res.render("profile", { pageTitle: "프로필", user });
};

export const getStats = (req, res) => {
  return res.render("stats");
};

export const ranking = (req, res) => {
  return res.render("ranking");
};
