import User from "../models/User";
import bcrypt from "bcrypt";

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }); // 소셜로그인...에 관한 정책수랍필요

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
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();

  return res.redirect("/");
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    userId,
    password,
    passwordCheck,
    nickname,
    email,
    mainSports,
    gender,
    birthday,
  } = req.body;

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
      passwordCheck,
      nickname,
      email,
      mainSports,
      gender,
      birthday,
    });

    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } catch (error) {
    return res
      .status(400)
      .render("join", { pageTitle: "Join", errorMessage: error });
  }
};
