import session from "express-session";
import User from "../models/User";

export const getHome = async (req, res) => {
 
  try{
    const id = req.session.user._id;
    const user = await User.findById(id);
    console.log(req.session);
    return res.render("home", { pageTitle: "Our GYM", user });
  } catch(error){
    console.log(error);
    return res.render("home",{ pageTitle: "Our GYM" });
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
    await User.findByIdAndUpdate(
      _id,
      { $push : {exercises: { exrname }} },
    );
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
