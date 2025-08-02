

const express = require('express');
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

const { createUser, login, getAll } = require('../controllers/userController')

router.post('/create-user', upload.single("profilePicture") ,createUser)
router.post('/login', login)
router.get('/users', protect, getAll)


module.exports = router;