import User from "../models/User";
import TimePerDay from "../models/TimePerDay";
import TimePerWeek from "../models/TimePerWeek";
import TimePerMonth from "../models/TimePerMonth";
import "babel-polyfill";

import { DataBrew } from "aws-sdk";
import { async } from "regenerator-runtime";

class GlobalController {
  date = new Date();
  year = parseInt(this.date.getFullYear());
  month = parseInt(this.date.getMonth() + 1);
  dateToday = parseInt(this.date.getDate());
  Today = `${this.year}. ${String(this.month).padStart(2, "0")}. ${String(
    this.dateToday
  ).padStart(2, "0")}`;
  thisWeek = `${this.year}. ${this.date.getWeek()}th`;
  thisMonth = `${this.year}. ${this.month}.`;

  constructor() {
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
  }
  getHome = async (req, res) => {
    try {
      const id = req.session.user._id;
      const user = await User.findById(id);
      const timePerDay = await TimePerDay.findOne({
        user: id,
        date: this.Today,
      });
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

  exrMeta = async (req, res) => {
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
      const timePerDay = await TimePerDay.findOne({
        user: _id,
        date: this.Today,
      });
      const target = timePerDay.exercises.find((it) => it.exrname === exr_name);
      target.exrmetas.push({
        exrmetaName: exercise_meta_name,
        exrmetaCount: exercise_meta_count,
        exrmetaOther: exercise_meta_other,
      });
      await timePerDay.save();
      return res.redirect("/");
    } catch (error) {
      console.log(error);
      return res.sendStatus(404);
    }
  };

  postHome = async (req, res) => {
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
        { user: _id, date: this.Today },
        {
          $push: { exercises: { exrname: exercise } },
        }
      );
      await timePerDay.save();
      const timePerWeek = await TimePerWeek.findOneAndUpdate(
        { user: _id, week: this.thisWeek },
        {
          $push: { exercises: { exrname: exercise } },
        }
      );
      await timePerWeek.save();
      const timePerMonth = await TimePerMonth.findOneAndUpdate(
        { user: _id, month: this.thisMonth },
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

  postAddTime = async (req, res) => {
    try {
      const {
        session: {
          user: { _id: id },
        },
        body: { index: indexExr, Today }, // "yyyy. mm. dd"
      } = req;

      const user = await User.findById(id);
      const timePerDay = await TimePerDay.findOne({ user: id, date: Today });
      const timePerWeek = await TimePerWeek.findOne({
        user: id,
        week: this.thisWeek,
      });
      const timePerMonth = await TimePerMonth.findOne({
        user: id,
        month: this.thisMonth,
      });

      if (!timePerMonth) {
        const createTimePerMonth = await TimePerMonth.create({
          month: this.thisMonth,
          user: id,
        });
        for (let i in user.exercises) {
          const updateTimePerMonth = await TimePerMonth.findOneAndUpdate(
            { user: id, month: this.thisMonth },
            { $push: { exercises: { exrname: user.exercises[i] } } }
          );
          await updateTimePerMonth.save();
        }
        await createTimePerMonth.save();
        timePerMonth = await TimePerMonth.findOne({
          user: id,
          Month: this.thisMonth,
        });
        return timePerMonth;
      }
      if (!timePerWeek) {
        const createTimePerWeek = await TimePerWeek.create({
          week: this.thisWeek,
          user: id,
        });
        for (let i in user.exercises) {
          const updateTimePerWeek = await TimePerWeek.findOneAndUpdate(
            { user: id, week: this.thisWeek },
            { $push: { exercises: { exrname: user.exercises[i] } } }
          );
          await updateTimePerWeek.save();
        }
        await createTimePerWeek.save();
        timePerWeek = await TimePerWeek.findOne({
          user: id,
          week: this.thisWeek,
        });
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

      //add 1 to exrtime & total time ::::::::: error......
      console.log(timePerDay);
      console.log(timePerWeek);
      console.log(timePerMonth);

      timePerDay.exercises[indexExr].exrtime += 1;
      timePerWeek.exercises[indexExr].exrtime += 1;
      timePerMonth.exercises[indexExr].exrtime += 1;
      timePerDay.total += 1;
      timePerWeek.total += 1;
      timePerMonth.total += 1;
      //nodefetch
      await timePerDay.save();
      await timePerWeek.save();
      await timePerMonth.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(404);
    }
  };

  deleteExr = async (req, res) => {
    try {
      const {
        session: {
          user: { _id: id },
        },
        body: { index: indexExr },
      } = req;
      const user = await User.findById(id);
      const timePerDay = await TimePerDay.findOne({
        user: id,
        date: this.Today,
      });
      const deleteExrFromUser = await User.findByIdAndUpdate(id, {
        $pull: { exercises: user.exercises[indexExr] },
      });
      const deleteExrFromTPD = await TimePerDay.findOneAndUpdate(
        { user: id, date: this.Today },
        {
          $pull: { exercises: timePerDay.exercises[indexExr] },
        }
      );
      await deleteExrFromUser.save();
      await deleteExrFromTPD.save();
      //user.exercises.splice(indexExr)
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(404);
    }
  };

  deleteExrMeta = async (req, res) => {
    try {
      const {
        session: {
          user: { _id: id },
        },
        body: { index: indexExr, indexMeta: indexExrMeta },
      } = req;
      const timePerDay = await TimePerDay.findOne({ user: id, date: Today });
      await timePerDay.exercises[indexExr].exrmetas.splice(indexExrMeta, 1);
      await timePerDay.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(404);
    }
  };

  profile = async (req, res) => {
    const user = await User.findById(req.session.user._id);
    return res.render("profile", { pageTitle: "프로필", user });
  };

  getStats = (req, res) => {
    return res.render("stats");
  };

  getRanking = async (req, res) => {
    const now = new Date().toISOString().substr(0, 10).split("-").join(". "); // 현재 날짜 및 시간
    // const yesterday = new Date(now.setDate(now.getDate() - 1))
    //   .toLocaleString()
    //   .substr(0, 12); // 어제

    // 1. 어제

    const timePerDays = await TimePerDay.find({ date: now })
      .sort({
        total: "desc",
      })
      .populate("user");

    console.log(now);

    return res.render("ranking", { pageTitle: "랭킹", timePerDays });
  };

  // 1. 그날의 누적 운동 시간합.

  postRanking = async (req, res) => {
    const {
      body: { filter },
      session: {
        user: { _id: id },
      },
    } = req;

    const user = await User.findById(id);

    const now = new Date().toISOString().substr(0, 10).split("-").join(". "); // 현재 날짜 및 시간
    // const yesterday = new Date(now.setDate(now.getDate() - 1))
    //   .toLocaleString()
    //   .substr(0, 12); // 어제

    // 1. 어제

    if (filter === "주종목") {
      const mainSports = user.mainSports;

      let timePerDays = await TimePerDay.find({ date: now })
        .sort({
          total: "desc",
        })
        .populate("user");
      timePerDays = Array.from(timePerDays).filter(
        (el) => el.user.mainSports === mainSports
      );

      return res.render("ranking", { pageTitle: "랭킹", timePerDays, filter });
    }
    if (filter === "누적 운동시간") {
      const timePerDays = await TimePerDay.find({ date: now })
        .sort({
          total: "desc",
        })
        .populate("user");

      return res.render("ranking", { pageTitle: "랭킹", timePerDays, filter });
    }
  };
}

export default GlobalController;
