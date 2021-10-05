import User from "../models/User";

export const home = (req, res) => {
  return res.render("home");
};

export const profile = (req, res) => {
  return res.render("profile", { user });
};
