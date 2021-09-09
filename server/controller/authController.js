// const JWT = require("jsonwebtoken");
// const User = require("../models/userModel");
// const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");
// const sendEmail = require("../utils/email");
// const { promisify } = require("util");
// const crypto = require("crypto");
import JWT from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/email.js";
import { promisify } from "util";
import crypto from "crypto";

const getToken = (id) => {
  return JWT.sign({ id: id }, "jwt_secret_that_is_very_Simple_toguess", {
    expiresIn: "9000",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = getToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 9000 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  //if (process.env.NODE_ENV === "production")
  //cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  // get user credential from body
  const { email, password } = req.body;

  //check if both are provided
  if (!password || !email) {
    return next(new AppError("please provide both email and password!", 401));
  }

  //get & check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPass(password, user.password))) {
    return next(new AppError("Invalid Email or Password!", 401));
  }
  createSendToken(user, 201, res);
});

export const protect = catchAsync(async (req, res, next) => {
  // check if header contains auth token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token);

  if (!token) {
    return next(new AppError("Please loggin to get access!", 401));
  }

  const decoded = await promisify(JWT.verify)(
    token,
    "jwt_secret_that_is_very_Simple_toguess"
  );
  // console.log(decoded);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = currentUser;

  next();
});

export const restrictedTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new AppError("You donot have permission..", 403));
    }

    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("no user with this email!", 404));
  }

  const resetToken = user.createResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // // 3) Update changedPasswordAt property for the user
  // // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPass(req.body.currentPassword, user.password))) {
    return next(new AppError("wrong password!", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
};
