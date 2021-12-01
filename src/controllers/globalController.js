import User from "../models/User";
import TimePerDay from "../models/TimePerDay";
import TimePerWeek from "../models/TimePerWeek";
import TimePerMonth from "../models/TimePerMonth";
import "babel-polyfill";
import { DataBrew } from "aws-sdk";
import { async } from "regenerator-runtime";

const date = new Date();
const year = parseInt(date.getFullYear());
const month = parseInt(date.getMonth() + 1);
const dateToday = parseInt(date.getDate());
//Week Number 계산
Date.prototype.getWeek = function (dowOffset) {
  dowOffset = typeof dowOffset == "number" ? dowOffset : 0; // dowOffset이 숫자면 넣고 아니면 0
  var newYear = new Date(this.getFullYear(), 0, 1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = day >= 0 ? day : day + 7;
  var daynum =
    Math.floor(
      (this.getTime() -
        newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
        86400000
    ) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      let nYear = new Date(this.getFullYear() + 1, 0, 1);
      let nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      /*if the next year starts before the middle of
        the week, it is week #1 of that year*/
      weeknum = nday < 4 ? 1 : 53;
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
};
const Today = `${year}. ${String(month).padStart(2, "0")}. ${String(
  dateToday
).padStart(2, "0")}`;
const thisWeek = `${year}. ${date.getWeek()}th`;
const thisMonth = `${year}. ${month}.`;

export const getHome = async (req, res) => {
  try {
    const id = req.session.user._id;
    const user = await User.findById(id);
    const timePerDay = await TimePerDay.findOne({ user: id, date: Today });

    return res.render("home", {
      pageTitle: "Our GYM",
      user,
      timePerDay,
    });
  } catch (error) {
    console.log(error);
    return res.render("home", { pageTitle: "Our GYM" });
  }
};

export const exrMeta = async (req,res) => {
  const {
    session: {
      user: { _id },
    },
    body: {
      exercise_meta_name,
      exercise_meta_count,
      exercise_meta_other,
      exr_name,
    },
  } = req;
  try {
    const timePerDay = await TimePerDay.findOne({ user: _id, date: Today });
    const target = timePerDay.exercises.find((it) => it.exrname === exr_name);
    target.exrmetas.push({
      exrmetaName: exercise_meta_name,
      exrmetaCount : exercise_meta_count,
      exrmetaOther: exercise_meta_other,
    });
    await timePerDay.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const postHome = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { exercise },
  } = req;
  try {
    const user = await User.findByIdAndUpdate(_id, {
      $push: { exercises: exercise },
    });
    await user.save();
    const timePerDay = await TimePerDay.findOneAndUpdate(
      { user: _id, date: Today },
      {
        $push: { exercises: { exrname: exercise } },
      }
    );
    await timePerDay.save();
    const timePerWeek = await TimePerWeek.findOneAndUpdate(
      { user: _id, week: thisWeek },
      {
        $push: { exercises: { exrname: exercise } },
      }
    );
    await timePerWeek.save();
    const timePerMonth = await TimePerMonth.findOneAndUpdate(
      { user: _id, month: thisMonth },
      {
        $push: { exercises: { exrname: exercise } },
      }
    );
    await timePerMonth.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).redirect("/");
  }
};

export const addTime = async (req, res) => {
  try {
    const {
      session: {
        user: { _id: id },
      },
      body: { index: indexExr, Today },
    } = req;
    const user = await User.findById(id);
    const timePerDay = await TimePerDay.findOne({ user: id, date: Today });
    const timePerWeek = await TimePerWeek.findOne({ user: id, week: thisWeek });
    const timePerMonth = await TimePerMonth.findOne({
      user: id,
      month: thisMonth,
    });

    if (!timePerMonth) {
      const createTimePerMonth = await TimePerMonth.create({
        month: thisMonth,
        user: id,
      });
      for (let i in user.exercises) {
        const updateTimePerMonth = await TimePerMonth.findOneAndUpdate(
          { user: id, month: thisMonth },
          { $push: { exercises: { exrname: user.exercises[i] } } }
        );
        await updateTimePerMonth.save();
      }
      await createTimePerMonth.save();
      timePerMonth = await TimePerMonth.findOne({ user: id, Month: thisMonth });
      return timePerMonth;
    }
    if (!timePerWeek) {
      const createTimePerWeek = await TimePerWeek.create({
        week: thisWeek,
        user: id,
      });
      for (let i in user.exercises) {
        const updateTimePerWeek = await TimePerWeek.findOneAndUpdate(
          { user: id, week: thisWeek },
          { $push: { exercises: { exrname: user.exercises[i] } } }
        );
        await updateTimePerWeek.save();
      }
      await createTimePerWeek.save();
      timePerWeek = await TimePerWeek.findOne({ user: id, week: thisWeek });
      return timePerWeek;
    }
    if (!timePerDay) {
      const createTimePerDay = await TimePerDay.create({
        date: Today,
        user: id,
      });
      for (let i in user.exercises) {
        const updateTimePerDay = await TimePerDay.findOneAndUpdate(
          { user: id, date: Today },
          { $push: { exercises: { exrname: user.exercises[i] } } }
        );
        await updateTimePerDay.save();
      }
      await createTimePerDay.save();
      timePerDay = await TimePerDay.findOne({ user: id, date: Today });
      return timePerDay;
    }

    //add 1 to exrtime & total time
    timePerDay.exercises[indexExr].exrtime += 1;
    timePerWeek.exercises[indexExr].exrtime += 1;
    timePerMonth.exercises[indexExr].exrtime += 1;
    timePerDay.total += 1;
    timePerWeek.total += 1;
    timePerMonth.total += 1;

    await timePerDay.save();
    await timePerWeek.save();
    await timePerMonth.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const deleteExr = async (req, res) => {
  try {
    const {
      session: {
        user: { _id: id },
      },
      body: { index: indexExr },
    } = req;
    const user = await User.findById(id);
    const deleteExr = await User.findByIdAndUpdate(id, {
      $pull: { exercises: user.exercises[indexExr] },
    });
    await deleteExr.save();
    //user.exercises.splice(indexExr)
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
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
