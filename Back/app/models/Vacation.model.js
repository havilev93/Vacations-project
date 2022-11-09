const mongoose = require("mongoose");

const VacationSchema = mongoose.Schema({
  destination: String,
  description: String,
  image: String,
  startDate: String,
  endDate: String,
  price: Number,
  followersList: Array,
});

module.exports = mongoose.model("_Vacation", VacationSchema);
