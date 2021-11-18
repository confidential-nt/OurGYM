import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "our-gym/images",
  acl: "public-read",
});

export const avatarUpload = multer({
  dest: "uploads/images/",
  limits: {
    fileSize: 3000000,
  },
  storage: s3ImageUploader,
});

export const localsMiddleare = (req, res, next) => {
  res.locals.siteName = "우리 GYM 타이머";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};
