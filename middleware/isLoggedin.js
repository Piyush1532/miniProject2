// const jwt = require("jsonwebtoken");
// const userModel = require("../models/user-model");

// module.exports = async (req, res, next) => {
//   if (!req.cookies.cookieToken) {
//     req.flash("error", "you need to login first");
//     return res.redirect("/");
//   }

//   try {
//     let decoded = jwt.verify(req.cookies.cookieToken, process.env.JWT_KEY);

//     let user = await userModel
//       .findOne({ email: decoded.email })
//       .select("-password");
//     req.user = user;
//     next();
//   } catch (error) {
//     req.flash("error", "you need to login first");
//     res.redirect("/");
//   }
// };


const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  if (!req.cookies.cookieToken) {
    req.flash("error", "You need to login first");
    return res.redirect("/");
  }

  try {
    // Verify the JWT
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.JWT_KEY);

    // Find the user in the database
    const user = await userModel.findOne({ email: decoded.email }).select("-password");
    if (!user) {
      req.flash("error", "User not found. Please login again.");
      return res.redirect("/");
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    req.flash("error", "Invalid token. Please login again.");
    res.redirect("/");
  }
};
