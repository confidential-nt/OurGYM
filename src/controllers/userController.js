import User from "../models/User";
import bcrypt from "bcrypt";
import TimePerDay from "../models/TimePerDay";
import TimePerWeek from "../models/TimePerWeek";
import TimePerMonth from "../models/TimePerMonth";

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

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this username doesn't exists.",
    });
  }
  // check if password correct
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  setTimeout(() => {
    return res.redirect("/");
  }, 1000);
};

export const logout = async (req, res) => {
  await req.session.destroy();
  return res.redirect("/");
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const isHeroku = process.env.NODE_ENV === "production";

  const {
    body: {
      userId,
      password,
      passwordCheck,
      nickname,
      email,
      mainSports,
      gender,
      birthday,
    },
    file,
  } = req;
  try {
    if (password !== passwordCheck) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    // 비밀번호 유효성 검사
    const exists = await User.exists({
      $or: [{ userId }, { email }, { nickname }],
    });
    if (exists) {
      throw new Error("이미 존재하는 아이디/이메일/별명 입니다.");
    }
    const user = await User.create({
      userId,
      password,
      nickname,
      email,
      mainSports,
      gender,
      birthday,
      profileImg: file ? (isHeroku ? file.location : file.path) : "",
    });
    req.session.loggedIn = true;
    req.session.user = user;

    await TimePerDay.create({
      date: `${year}. ${String(month).padStart(2, "0")}. ${String(
        dateToday
      ).padStart(2, "0")}`,
      user: user._id,
    });
    await TimePerWeek.create({
      week: `${year}. ${date.getWeek()}th`,
      user: user._id,
    });
    await TimePerMonth.create({
      month: `${year}. ${month}.`,
      user: user._id,
    });
    setTimeout(() => {
      return res.redirect("/");
    }, 1000);
  } catch (error) {
    return res
      .status(400)
      .render("join", { pageTitle: "Join", errorMessage: error });
  }
};

export const userDelete = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { password },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(password, user.password);

  if (ok) {
    await User.findByIdAndDelete(_id);
    await TimePerDay.deleteMany({ user: _id });
    await TimePerWeek.deleteMany({ user: _id });
    await TimePerMonth.deleteMany({ user: _id });
    await req.session.destroy();

    return res.redirect("/"); // flash 메시지..
  } else {
    return res.status(400).redirect("/profile"); //flash 메시지
  }
};

export const getUserEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;

  const user = await User.findById(_id);

  return res.render("userEdit", { pageTitle: "Edit Profile", user });
};

export const postUserEdit = async (req, res) => {
  const isHeroku = process.env.NODE_ENV === "production";

  const {
    body: { nickname, mainSports, birthday },
    file,
    session: {
      user: { _id, profileImg },
    },
  } = req;

  await User.findByIdAndUpdate(_id, {
    nickname,
    mainSports,
    birthday,
    profileImg: file ? (isHeroku ? file.location : file.path) : profileImg,
  });

  return res.redirect("/profile");
};
