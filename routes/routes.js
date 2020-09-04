const express = require('express');
const transactionRouter = express.Router();

const transactionController = require('../controllers/TransactionController');

transactionRouter.get('/', transactionController.find);

transactionRouter.post('/', transactionController.create);

module.exports = transactionRouter;
