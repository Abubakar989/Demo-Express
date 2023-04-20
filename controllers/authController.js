const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { sendEmail } = require("../utils/emailFeature");

const createToken = id => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) check if email and password exist
    if (!email || !password) {
      return next(
        new AppError(404, "fail", "Please provide email or password"),
        req,
        res,
        next,
      );
    }

    // 2) check if user exist and password is correct
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        new AppError(401, "fail", "Email or Password is wrong"),
        req,
        res,
        next,
      );
    }

    // 3) All correct, send jwt to client
    const token = createToken(user.id);

    // Remove the password from the output
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    const token = createToken(user.id);

    user.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) Get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new AppError(404, "fail", "There is no user with that email address."),
        req,
        res,
        next,
      );
    }

    // 2) Generate a random six digit code
    const code = Math.floor(100000 + Math.random() * 900000);
    console.log(`The code for user ${user.email} is ${code}`);

    // 3) Hash the code and save it in user document
    const hashedCode = crypto.createHash('sha256').update(code.toString()).digest('hex');
    user.passwordResetCode = hashedCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save({ validateBeforeSave: false });

    const message = `Your Password reset code is ${code}`

    // 4) Send code to user
    await sendEmail(user.email, 'Your Reset Password Code', message);

    // 5) Send success response to client
    res.status(200).json({
      status: "success",
      message: `Code sent to email! ${code}`,
    });
  } catch (err) {
    next(err);
  }
};

exports.confirmCodeAndResetPassword = async (req, res, next) => {
  try {
    // 1) Get the user based on the email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError(404, 'fail', 'User not found'));
    }
    const hashedCode = crypto.createHash('sha256').update(req.body.code.toString()).digest('hex');

    // 2) Check if the code matches
    if (user.passwordResetCode !== hashedCode) {
      return next(new AppError(400, 'fail', 'Invalid code'));
    }

    // 4) Update the password and reset the code
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetCode = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save();

    // 5) Log the user in and send the JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Remove the password from the output
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};