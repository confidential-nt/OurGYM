import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

// const s3 = new aws.S3({
//   credentials: {
//     accessKeyId: process.env.AWS_ID,
//     secretAccessKey: process.env.AWS_SECRET,
//   },
// });

// const isHeroku = process.env.NODE_ENV === "production";

// const s3ImageUploader = multerS3({
//   s3: s3,
//   bucket: "our-gym/images",
//   acl: "public-read",
// });

// export const imgUpload = multer({
//   dest: "uploads/images/",
//   limits: {
//     fileSize: 3000000,
//   },
//   storage: isHeroku ? s3ImageUploader : undefined,
// });

// export const localsMiddleare = (req, res, next) => {
//   res.locals.siteName = "우리 GYM 타이머";
//   res.locals.loggedIn = Boolean(req.session.loggedIn);
//   res.locals.loggedInUser = req.session.user || {};
//   res.locals.isHeroku = process.env.NODE_ENV === "production";
//   next();
// };

class Middlewares {
  isHeroku = process.env.NODE_ENV === "production";
  static s3ImageUploader = multerS3({
    s3: new aws.S3({
      credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
      },
    }),
    bucket: "our-gym/images",
    acl: "public-read",
  });

  static imgUpload = multer({
    dest: "uploads/images/",
    limits: {
      fileSize: 3000000,
    },
    storage:
      process.env.NODE_ENV === "production"
        ? Middlewares.s3ImageUploader
        : undefined,
  });

  static protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
      return next();
    }
    req.flash("error", "유효하지 않은 접근입니다");
    return res.redirect("/login");
  };

  static publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
      return next();
    }
    req.flash("error", "유효하지 않은 접근입니다");
    return res.redirect("/");
  };

  static localsMiddleare = (req, res, next) => {
    res.locals.siteName = "우리 GYM 타이머";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    res.locals.isHeroku = process.env.NODE_ENV === "production";
    next();
  };
}

export default Middlewares;
