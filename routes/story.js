const express = require('express');
const userStoryController = require('../controllers/story');

const router = express.Router();

router.get("/",userStoryController);


module.exports = router;