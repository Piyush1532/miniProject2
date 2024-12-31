require("dotenv").config()
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3300;
const expressSession=require("express-session")
const flash=require("connect-flash")




const db=require("./config/mongoose-connection")

const ownerRouter=require("./routes/ownersRouter")
const userRouter=require("./routes/userRouter")
const productsRouter=require("./routes/productsRouter")
const indexRouter=require("./routes/index");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(
  expressSession({
  resave:false,
  saveUninitialized:false,
  secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())

//routes 
app.use("/",indexRouter)
app.use("/owners",ownerRouter)
app.use("/users",userRouter)
app.use("/products",productsRouter)



app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});




{/* <div class="w-60">
<div class="w-full h-52 flex items-center justify-center bg-[<%= product.bgcolor %>]">
    <img class="h-[12rem]" src="data:image/jpeg;base64,<%= product.image.toString('base64') %>"
        alt="">
</div>
<div
    class="flex justify-between bg-[<%= product.panelcolor %>] items-center px-4 py-4 text-[<%= product.textcolor %>]">
    <div>
        <h3>
            <%= product.name %>
        </h3>
        <h4>₹ <%= product.price %>
        </h4>
    </div>
    <a class="w-7 h-7 flex items-center justify-center rounded-full bg-white" href="">
        <i class="ri-add-line"></i>
    </a>
</div>
</div> */}