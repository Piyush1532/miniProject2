const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");


module.exports.registerUser = async function (req, res) {
  try {
    let { email, fullname, password } = req.body;

    let userfind = await userModel.findOne({ email: email });
    if (userfind){
      req.flash("error","USer Exist")
      return res.redirect("/")
    }
      

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("cookieToken", token);
          res.send("user created success");
        }
      });
    });
  } 
  catch (error) {
    res.send(error.message);
  }
};




module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  try {
    // Find the user in the database
    let user = await userModel.findOne({ email: email });
    if (!user) {
      req.flash("error", "Email or password incorrect");
      return res.redirect("/"); // Redirect back to login page
    }

    // Compare passwords
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        req.flash("error", "Something went wrong. Please try again.");
        return res.redirect("/");
      }

      if (result) {
        // Generate JWT token and set cookie
        let token = generateToken(user);
        res.cookie("cookieToken", token);
        return res.redirect("/shop"); // Redirect to shop page on successful login
      } else {
        req.flash("error", "Email or password incorrect");
        return res.redirect("/"); // Redirect back to login page
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    req.flash("error", "An unexpected error occurred. Please try again.");
    res.redirect("/");
  }
};



module.exports.logoutUser=async (req,res) => {
  res.cookie("cookieToken","")
  res.redirect("/")
}