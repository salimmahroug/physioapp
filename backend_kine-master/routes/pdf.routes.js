const { addPdf,
    getPlayerPdfs,
    getAllPdfs,
    deletePdf,
    addPlayerInjuryPdf,
    getPlayerInjuriesPdfs,
    deletePlayerInjuryPdf
} = require('../controllers/pdf.controller')



const {
    isAuthHeaders,
    checkUserPlayerOwnership,
} = require("../middleware/isAuth.middleware");

const router = require("express").Router();


router.post('/:playerId/addPdf', isAuthHeaders, checkUserPlayerOwnership, addPdf)
router.get("/:playerId/getAllPdfs", isAuthHeaders, checkUserPlayerOwnership, getPlayerPdfs)
router.get("/", isAuthHeaders, getAllPdfs)
router.delete("/:playerId/delete/:id", isAuthHeaders, checkUserPlayerOwnership, deletePdf)
router.post('/:playerId/addPlayerInjuryPdf', isAuthHeaders, checkUserPlayerOwnership, addPlayerInjuryPdf)
router.get("/:playerId/getPlayerInjuriesPdfs", isAuthHeaders, checkUserPlayerOwnership, getPlayerInjuriesPdfs)
router.delete("/:playerId/deletePlayerInjuryPdf", isAuthHeaders, checkUserPlayerOwnership, deletePlayerInjuryPdf)


module.exports = router;
