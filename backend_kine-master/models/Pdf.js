const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    name:{type:String},
    pdfurl :{type:String},
    player:{type: mongoose.Types.ObjectId, ref:"Player"},
    injury:{type: mongoose.Types.ObjectId, ref:"Injury"} 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pdf", pdfSchema);
