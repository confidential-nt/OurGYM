import User from "../models/User";

export const home = (req, res) => {
  console.log(req.session);
  return res.render("home");
};

export const profile = (req, res) => {
  return res.render("profile", { user });
};
