const {
  addComment,
  addPlayerInjury,
  getAllInjuries,
  getPlayerInjuries,
  getInjuryById,
  deleteInjury,
  updateInjury,
  analyseByInjury,
  analyseByPlayerId,
} = require("../controllers/injurie.controller");
const {
  isAuthHeaders,
  checkUserPlayerOwnership,
} = require("../middleware/isAuth.middleware");

const router = require("express").Router();

router.post("/stats/:playerId", isAuthHeaders, analyseByPlayerId);
router.post("/stats", isAuthHeaders, analyseByInjury);
router.post(
  "/add-comment/:playerId/:injuryId",
  isAuthHeaders,
  checkUserPlayerOwnership,
  addComment
);
router.post(
  "/:playerId",
  isAuthHeaders,
  checkUserPlayerOwnership,
  addPlayerInjury
);
router.get("/", isAuthHeaders, getAllInjuries);
router.post(
  "/player/:playerId",
  isAuthHeaders,
  checkUserPlayerOwnership,
  getPlayerInjuries
);
router.put("/:id", isAuthHeaders, updateInjury);
router.get("/:id", isAuthHeaders, getInjuryById);
router.delete("/:id", isAuthHeaders, deleteInjury);

module.exports = router;
