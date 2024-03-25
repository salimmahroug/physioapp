const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const injurySchema = new mongoose.Schema(
  {
    name: { type: String },
    Place: { type: String },
    season: { type: String },
    degree: { type: String },
    description: { type: String },
    datedebut: { type: String },
    datedefin: { type: String },
    player: { type: mongoose.Types.ObjectId, ref: "Player" },
    comment: [{ type: String }],
    pdfs:[{type:mongoose.Types.ObjectId,ref:"Pdf"}],
    urlimage: { type: String },
    diffDays : { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Injury", injurySchema);
