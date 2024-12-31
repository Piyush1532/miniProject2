const mongoose = require("mongoose");
const config=require("config")
const debug=require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/miniProject2`)
  .then(() => {
    debug("Connected to MongoDB")
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

module.exports = mongoose.connection;
