import User from "../models/User";
import TimePerDay from "../models/TimePerDay";
import TimePerWeek from "../models/TimePerWeek";
import TimePerMonth from "../models/TimePerMonth";

export const getHome = async (req, res) => {
  try {
    const id = req.session.user._id;
    const user = await User.findById(id);
    const timePerDays = await TimePerDay.findOne({ user: id });
    // console.log(timePerDays);
    // const timePerWeek = await TimePerWeek.findById(id);
    // const timePerMonth = await TimePerMonth.findById(id);
    return res.render("home", { pageTitle: "Our GYM", user, timePerDays });
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
    const user = await User.findByIdAndUpdate(_id, {
      $push: { exercises: { exrname } },
    });
    //await TimePerDay.findByIdAndUpdate(_id, { timePerDay:{$push: { exercises: { exrname } }}  });
    //await TimePerWeek.findByIdAndUpdate(_id, { timePerWeek:{$push: { exercises: { exrname } }}  });
    //await TimePerMonth.findByIdAndUpdate(_id, { timePerMonth:{$push: { exercises: { exrname } }}  });
    await user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).redirect("/");
  }
};

export const addTime = async (req, res) => {
  const id = req.session.user._id;
  const indexExr = req.body.index;
  const user = await User.findById(id);
  const timePerDays = await TimePerDay.findOne({ user: id });
  const { timePerDay } = timePerDays;
  const indexTotal = timePerDay.findIndex((x) => {
    return x.date === "2021년 11월 24일";
  });
  
  if (!user.exercises) {
    return res.sendStatus(404);
  }
  user.exercises[indexExr].exrtime += 1;
  timePerDays.timePerDay[indexTotal].total += 1;
  await user.save();
  await timePerDays.save();
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const user = await User.findById(req.session.user._id);

  console.log(user);

  return res.render("profile", { pageTitle: "프로필", user });
};

export const getStats = (req, res) => {
  return res.render("stats");
};

export const ranking = (req, res) => {
  return res.render("ranking");
};
