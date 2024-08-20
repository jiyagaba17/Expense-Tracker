const {addIncome, getIncomes, deleteIncome} = require('../controllers/income.js');
const {addExpense, getExpenses, deleteExpense} = require('../controllers/expense.js');


const router = require('express').Router()

//test
// router.get('/', (req,res)=>{
//     res.send('Hello world')
// })


//defining end points

router.post('/add-income', addIncome) //coming from controllers
         .get('/get-incomes', getIncomes)
         .delete('/delete-income/:id', deleteIncome)
         .post('/add-expense', addExpense)
         .get('/get-expenses', getExpenses)
         .delete('/delete-expense/:id', deleteExpense)

module.exports = router