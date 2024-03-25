const {
  signIn,
  logout,
  getCurrentUser,
} = require("../controllers/auth.controller");
const { isAuthHeaders } = require("../middleware/isAuth.middleware");

const router = require("express").Router();

router.post("/signin", signIn);
router.get("/logout", isAuthHeaders, logout);
router.get("/me", isAuthHeaders, getCurrentUser);

module.exports = router;