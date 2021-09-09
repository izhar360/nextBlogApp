import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please enter your name!"],
  },
  lastName: {
    type: String,
    required: [true, "please enter your name!"],
  },
  role: {
    type: String,
    enum: ["admin", "user", "guide", "lead-guide"],
    default: "user",
  },
  email: {
    type: String,
    required: [true, "please enter your name!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email!"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "please enter password!"],
    minlength: 8,
    select: false,
  },
  passwordChangedAt: Date,
  passwordConfirm: {
    type: String,
    required: [true, "please enter password to confirm!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords do not match!",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPass = async (ComingOne, HashedOne) => {
  return await bcrypt.compare(ComingOne, HashedOne);
};

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  //  console.log(this.passwordChangedAt);
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
const User = mongoose.model("User", userSchema);

export default User;
