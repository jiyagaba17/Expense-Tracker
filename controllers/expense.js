const ExpenseSchema = require("../models/expenseModel")

//adding expense
exports.addExpense = async (req, res) =>{
    // console.log(req.body); //returning object 

    const {title, amount, category, description, date} = req.body

    //creating new instance, using schema

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    console.log(expense)

    try{
        //validations - when input empty

        if(!title  || !category || !description || !date)
        {
            return res.status(400).json({message:'All fields are required!'})
        }

        if(amount<=0 || !amount==='number')
            {
                return res.status(400).json({message:'Amount must be a positive number!'})
            }

        await expense.save()
        res.status(200).json({message: 'Expense Added!'})

    } catch(error){
        res.status(500).json({message: 'Server Error!'})

    }

}

//getting expenses
exports.getExpenses = async (req, res) =>{

    try{
        ///sorting these items, last created on top
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)

    }
    catch(error)
    {
        res.status(500).json({message: 'Server Error!'})
    }
}

//deleting expense
exports.deleteExpense = async (req, res) =>{

    //first get its id to delete it
    const {id} = req.params;
    
    // console.log(req.params);


    ExpenseSchema.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({message: 'Expense Deleted'})
    })

    .catch((err)=>{
        res.status(500).json({message: 'Server Error!'})
    })
}