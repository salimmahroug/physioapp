const { findById } = require("../models/players.model");
const Player = require("../models/players.model");
const { KineUser } = require("../models/users.model");
const ExpressError = require("../utils/errorObject");

async function addPlayer(req, res, next) {
  try {
    const {
      firstname,
      lastname,
      email,
      date,
      category,
      position,
      height,
      weight,
      phoneNumber,
      idNumber,
      Urlimage,
    } = req.body;
    const user = await KineUser.findById(req.user.sub);
    console.log(user);

    const verfPlayer = new Player({
      firstname: firstname,
      lastname: lastname,
      email: email,
      date: date,
      category: category,
      position: position,
      height: height,
      weight: weight,
      phoneNumber: phoneNumber,
      idNumber:idNumber,
      Urlimage: Urlimage,
    });
    user.players.push(verfPlayer._id);
    const savedPlayer = await verfPlayer.save();
    user.save();
    res.status(200).json(savedPlayer);
  } catch (err) {
    next(err);
  }
}

async function updatePlayer(req, res, next) {
  try {
    const {
      firstname,
      lastname,
      email,
      date,
      category,
      position,
      height,
      weight,
      phoneNumber,
      idNumber,
      Urlimage,
    } = req.body;
    const id = req.params["id"];
     await Player.updateOne(
      { _id: id },
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        date: date,
        category: category,
        position: position,
        height: height,
        weight: weight,
        phoneNumber: phoneNumber,
        idNumber:idNumber,
        Urlimage: Urlimage,
      }
    );
    const data = await Player.findOne({_id: id});
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getPlayerById(req, res, next) {
  try {
    const id = req.params["id"];
    const data = await Player.findById(id);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getPlayersByCategory(req, res, next) {
  try {
    const category = req.params["category"];
    const data = await Player.find({ category: category }); 

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}


async function getAllPlayers(req, res, next) {
  try {
    const user = await KineUser.findById(req.user.sub).populate("players");

    if (!user) {
      throw new ExpressError("Bad request headers", 401);
    }

    res.status(200).json(user.players);
  } catch (err) {
    next(err);
  }
}

async function deletePlayer(req, res, next) {
  try {
    const id = req.params["id"];
    const data = await Player.findOneAndRemove({ _id: id });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
async function updatePlayerCategory(req, res, next) {
  try {
    const playerId = req.params.playerId;
    const { category } = req.body;
    const userId =req.user.sub;

    // Retrieve the user who owns the categories
    const user = await KineUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has this category
    if (!user.customCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Update the player's category
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { category },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json(updatedPlayer);
  } catch (err) {
    next(err); 
  }
}


module.exports = {
  addPlayer,
  updatePlayer,
  deletePlayer,
  getPlayerById,
  getAllPlayers,
  getPlayersByCategory,
  getPlayerById,
  updatePlayerCategory
};
