const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

// router.get("/", (req, res) => {
//   res.send("owner  is working");
// });

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
let {fullname,email,password}=req.body

   let owners=await ownerModel.find()
   if (owners.length>0) {
    return res.status(503).send("You Don't Have Permission to Create a new owner")
   }

  let createOwner= await ownerModel.create({
    fullname,
    email,
    password,
   })
   res.send(createOwner).status(200)
  });
}


router.get("/admin", (req, res) => {
  let sucess=req.flash("sucess")
  res.render("createproducts",{sucess})
});

module.exports = router;
