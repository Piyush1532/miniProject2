const express=require("express")
const router=express.Router()
const isLoggedin=require("../middleware/isLoggedin")
const productModel=require("../models/product-model")

router.get("/",(req,res)=>{
let error= req.flash("error")
res.render("index",{error})


})

router.get("/shop",isLoggedin,async function  (req,res) {
   let products=await productModel.find()
   res.render("shop",{products}) 
})

router.get("/logout",isLoggedin,function (req,res) {
   res.render("shop") 
})


module.exports=router