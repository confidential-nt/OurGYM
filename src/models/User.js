import mongoose from "mongoose";
import bcrypt from "bcrypt";

const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImg: { type: String, default: "" },
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mainSports: { type: String, required: true },
  // exercises: [
  //   {
  //     exrname: { type: String },
  //     exrtime: { type: Number },
  //   },
  // ],
  gender: { type: String },
  birthday: { type: String },
  //like this?
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;

// timePerDay: [{ type: objectId, ref: "TimePerDay" }],
// timePerWeek: [{ type: objectId, ref: "TimePerWeek" }],
// timePerMonth: [{ type: objectId, ref: "TimePerMonth" }],
