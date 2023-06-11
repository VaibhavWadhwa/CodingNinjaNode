const express = require('express');
const {createOrderController,cardDetailController} = require('../controllers/checkout');

const router = express.Router();

router.post("/createorder",createOrderController);
router.post("/card-detail",cardDetailController);


module.exports = router;