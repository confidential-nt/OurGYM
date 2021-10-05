import User from "../models/User";

export const home = (req, res) => {
  return res.render("home");
};

export const profile = (req, res) => {
  return res.render("profile");
};

export const calender = (req,res) =>{
  return res.render("calender");
};

export const group = (req,res) =>{
  return res.render("group");
};
