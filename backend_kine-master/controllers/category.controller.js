const { findById } = require("../models/players.model");
const Player = require("../models/players.model");
const { KineUser } = require("../models/users.model");
const ExpressError = require("../utils/errorObject");


async function addCustomCategory(req, res, next) {
  try {
    const { categoryName } = req.body;
    const userId = req.params.id;

    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const user = await KineUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent adding a category that already exists
    if (user.customCategories.includes(categoryName)) {
      return res.status(400).json({ message: "Category already exists" });
    }

    user.customCategories.push(categoryName); // Append new category without affecting existing ones
    await user.save();

    res.redirect(`/api/category/categoriesList/${userId}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
}


  async function getCategories(req, res, next) {
    try {
      const userId = req.user.sub;
      const user = await KineUser.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user.customCategories);
    } catch (err) {
      next(err);
    }
  }
  async function getcategoryrView(req, res) {
    try {
      const id = req.params["id"];
      const user = await KineUser.findById(id);
      if (!user) {
        throw new ExpressError("User not find with id " + id, 400);
      }
      res.render("pages/admin-editusercategory", { user: user, categorylist: user.customCategories });
    } catch (e) {
      next(err)
    }
  }
  
  async function updateCategory(req, res, next) {
    try {
      const userId = req.params["id"];
      const { oldCategoryName, newCategoryName } = req.body;
  
      const user = await KineUser.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const index = user.customCategories.indexOf(oldCategoryName);
      if (index === -1) {
        return res.status(400).json({ message: "Old Category not found" }); // If old category doesn't exist, we can't update it.
      }
  
      user.customCategories[index] = newCategoryName; // Update the category name
      await user.save();
  
      res.redirect(`/api/category/categoriesList/${userId}`);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  async function deleteCategory(req, res, next) {
    try {
      const userId = req.params["id"];
      const { categoryName } = req.body; // or from req.params, depending on how you send the data
  
      const user = await KineUser.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the category exists
      const index = user.customCategories.indexOf(categoryName);
      if (index === -1) {
        return res.status(400).json({ message: "Category does not exist" }); // If category doesn't exist, we can't delete it.
      }
  
      // Filter out all instances of the category
      user.customCategories = user.customCategories.filter(category => category !== categoryName);
  
      await user.save();
  
      res.redirect(`/api/category/categoriesList/${userId}`);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  

  //update player category !! 
  
  async function updatePlayerCategory(req, res, next) {
    try {
      const playerId = req.params.playerId;
      const { category } = req.body;
      const userId = req.params["id"];

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
  
      // If the player wasn't found, handle it appropriately
      if (!updatedPlayer) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
      res.status(200).json(updatedPlayer);
    } catch (err) {
      next(err); // Make sure to have error handling middleware in place
    }
  }
  module.exports = {
    addCustomCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    updatePlayerCategory,
    getcategoryrView
  };
  