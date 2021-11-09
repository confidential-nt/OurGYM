import User from "../models/User";
import Exercise from "../models/Exercise";

export const getHome = async (req, res) => {
  const exercises = await Exercise.find({});
  console.log(req.session);
  return res.render("home", { pageTitle: "Our GYM", exercises });
};

export const postHome = async (req, res) => {
  const { _id } = req.session.user;
  const { exrname } = req.body;
  try {
    await Exercise.create({
      exrname,
    });
    await User.findByIdAndUpdate(_id, )
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).redirect("/");
  }
};

export const profile = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  return res.render("profile", { user });
};

export const calender = (req, res) => {
  return res.render("calender");
};

export const ranking = (req, res) => {
  return res.render("ranking");
};
