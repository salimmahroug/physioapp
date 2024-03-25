const router = require("express").Router();
const {addQuiz,getPlayer,
  getPlayerQuizzes,
  getAllQuizzes,
  deleteQuiz}=require("../controllers/quiz.controller")


  const {
    isAuthHeaders,
    checkUserPlayerOwnership,
  } = require("../middleware/isAuth.middleware");


router.post(
  "/:playerId/addQuiz",
  isAuthHeaders,
  checkUserPlayerOwnership,getPlayer,
  addQuiz
)
router.get("/:playerId/getPlayerQuizzes",isAuthHeaders,checkUserPlayerOwnership,getPlayerQuizzes)
router.get("/",isAuthHeaders,getAllQuizzes) 
router.delete("/delete/:id",isAuthHeaders,deleteQuiz)





module.exports = router;
