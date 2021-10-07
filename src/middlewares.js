export const localsMiddleare = (req, res, next) => {
  res.locals.siteName = "우리 GYM 타이머";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};
