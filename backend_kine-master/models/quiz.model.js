const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    player:{type: mongoose.Types.ObjectId, ref:"Player"} ,
    Quality: { type: Number },
    Stress: { type: Number},
    Fatigue: { type: Number },
    Remarque: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
