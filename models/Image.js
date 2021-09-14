const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  label: String,
  url: String,
});
module.exports = new mongoose.model("Image", imageSchema);
