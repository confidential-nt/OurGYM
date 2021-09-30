import User from "../models/User";

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = (req, res) => {};

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
  } = req.body;

  try {
    if (password !== passwordCheck) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    const exists = await User.exists({
      $or: [{ userId }, { email }, { nickname }],
    });

    if (exists) {
      throw new Error("이미 존재하는 아이디/이메일/별명 입니다.");
    }

    await User.create({
      userId,
      password,
      passwordCheck,
      nickname,
      email,
      mainSports,
      gender,
    });

    return res.redirect("/login"); // 나중에 유저 로그인 시키기
  } catch (error) {
    return res
      .status(400)
      .render("join", { pageTitle: "Join", errorMessage: error });
  }
};
