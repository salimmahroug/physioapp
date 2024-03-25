const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    firstname: { type: String,  trim: true },
    lastname: { type: String,  trim: true },
    email: { type: String, trim: true },
    date: { type: String  },
    category: { type: String },
    position: { type: String},
    height: { type: String },
    weight: { type: String},
    phoneNumber: { type: String},
    idNumber: { type: String},
    Urlimage: { type: String},
    injuries: [{ type: mongoose.Types.ObjectId, ref: "Injury" }],
    pdfs:[{type:mongoose.Types.ObjectId,ref:"Pdf"}],
    quizzes:[{type:mongoose.Types.ObjectId,ref:"Quiz"}]
  },
  { timestamps: true }
);
module.exports = mongoose.model("Player", playerSchema);