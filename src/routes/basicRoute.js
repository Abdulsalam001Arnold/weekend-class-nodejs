const express = require("express");
const router = express.Router();

const { getHome, postContact, getAll, getSingle, deleteContact } = require("../controllers/basicLogic")

router.get("/", getHome);
router.post('/create-contact', postContact)
router.get('/get-contacts', getAll)
router.get('/get-single-contact/:id', getSingle)
router.delete('/delete-contact/:id', deleteContact)

module.exports = router;
