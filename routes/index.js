const express=require("express")
const router=express.Router()
const isLoggedin=require("../middleware/isLoggedin")

router.get("/",(req,res)=>{
let error= req.flash("error")
res.render("index",{error})


})

router.get("/shop",isLoggedin,function (req,res) {
   res.render("shop") 
})

router.get("/logout",isLoggedin,function (req,res) {
   res.render("shop") 
})


module.exports=router