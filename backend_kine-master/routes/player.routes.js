const router = require("express").Router();
const {
  getPlayerById,
  getPlayersByCategory,
  getAllPlayers,
  deletePlayer,
  addPlayer,
  updatePlayer,
  updatePlayerCategory
} = require("../controllers/player.controller");
const { isAuthHeaders } = require("../middleware/isAuth.middleware");

router.post("/", isAuthHeaders, addPlayer);
router.put("/:id", isAuthHeaders, updatePlayer);
router.get("/:id", isAuthHeaders, getPlayerById);
router.post("/category/:category", isAuthHeaders, getPlayersByCategory);
router.get("/", isAuthHeaders, getAllPlayers);
router.delete("/:id", isAuthHeaders, deletePlayer);
router.put("/:playerId/updateCategory", isAuthHeaders, updatePlayerCategory)
module.exports = router;
