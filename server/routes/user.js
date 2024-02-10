const express = require('express');
const userController = require('../controller/userController');
// const User = require('../model/user')

const router = express.Router();

router.get('/user/get-expense',userController.getExpense);

router.post('/user/add-expense', userController.addExpense);

router.delete('/user/delete-expense/:id',userController.deleteExpense);

router.put('/user/update-expense/:id', userController.updateExpense);

module.exports = router;           