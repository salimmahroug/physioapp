const { Schema, default: mongoose, model } = require("mongoose");
const Player = require("./players.model");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "kine"],
    required: true,
    default: "kine",
  },
  clubType: {
  type: String,
  enum: ['football', 'handball', 'basketball', 'baseball', 'volleyball', 'rugby', 'tennis', 'golf', 'swimming', 'cricket', 'hockey', 'athletics', 'cycling', 'gymnastics', 'eSports', 'badminton', 'tableTennis', 'archery', 'boxing', 'wrestling', 'karate', 'sailing', 'skiing', 'fencing'],
  required: true,
  default: "football",
},
  token: { type: String },
});

const kineUserShema = new Schema({
  players: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Player",
    },
  ],
  customCategories: {
    type: [String], 
    default: [
      "First team", 
      "Olympic team", 
      "U19",
      "U17",
      "U15",
      "U13",
      "Academy team", 
    ]
  },
  supervisorCategory: {
    type: [String],
    default: [
      "sup_pass1",
      "sup_pass2",
      "sup_pass3",
      "sup_pass4",
      "sup_pass5",
      "sup_pass6",
      "sup_pass7",
    ],
  },
  technicalStaffCategory: {
    type: [String],
    default: [
      "tech_staff_pass1",
      "tech_staff_pass2",
      "tech_staff_pass3",
      "tech_staff_pass4",
      "tech_staff_pass5",
      "tech_staff_pass6",
      "tech_staff_pass7",
    ],
  },
  playerCategory: {
    type: [String],
    default: [
      "player_pass1",
      "player_pass2",
      "player_pass3",
      "player_pass4",
      "player_pass5",
      "player_pass6",
      "player_pass7",
    ],
  },
});

const User = model("User", userSchema);
const KineUser = User.discriminator("KineUser", kineUserShema);

module.exports = { User, KineUser };
