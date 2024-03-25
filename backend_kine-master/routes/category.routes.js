
const express = require("express");
const {
  addCustomCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  updatePlayerCategory,
  getcategoryrView,
} = require("../controllers/category.controller"); 

const { isAdmin } = require("../middleware/isAdmin.middleware");
const {
  isAuthLocalStorage,
  isAuthHeaders,
} = require("../middleware/isAuth.middleware");

// Router initialization    
const router = express.Router();

// Category management routes
router.post("/:id", isAuthLocalStorage, isAdmin, addCustomCategory);
router.get("/",isAuthHeaders,getCategories);
router.put("/:id", isAuthLocalStorage, isAdmin, updateCategory); // This could also be a PATCH request depending on how you want to handle it
router.get("/:id", isAuthLocalStorage, isAdmin, deleteCategory);
router.put("/player-category/:playerId/:id", isAuthLocalStorage, isAdmin, updatePlayerCategory);
router.get("/categoriesList/:id", isAuthLocalStorage, isAdmin, getcategoryrView);

// Exporting the configured routes
module.exports = router;
