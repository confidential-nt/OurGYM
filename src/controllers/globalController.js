import User from "../models/User";

export const home = (req, res) => {
  return res.render("home");
};

export const profile = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  return res.render("profile", { user });
};
