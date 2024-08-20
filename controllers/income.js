const IncomeSchema = require("../models/incomeModel")

//adding income
exports.addIncome = async (req, res) =>{
    // console.log(req.body); //returning object 

    const {title, amount, category, description, date} = req.body

    //creating new instance, using schema

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    console.log(income)

    try{
        //validations - when input empty

        if(!title || !category || !description || !date)
        {
            return res.status(400).json({message:'All fields are required!'})
        }

        if(amount<=0 || !amount==='number')
            {
                return res.status(400).json({message:'Amount must be a positive number!'})
            }

        await income.save()
        res.status(200).json({message: 'Income Added!'})

    } catch(error){
        res.status(500).json({message: 'Server Error!'})

    }

}

//getting incomes
exports.getIncomes = async (req, res) =>{

    try{
        ///sorting these items, last created on top
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)

    }
    catch(error)
    {
        res.status(500).json({message: 'Server Error!'})
    }
}

//deleting incomes
exports.deleteIncome = async (req, res) =>{

    //first get its id to delete it
    const {id} = req.params;

    // console.log(req.params);


    IncomeSchema.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message: 'Income Deleted'})
    })

    .catch((err)=>{
        res.status(500).json({message: 'Server Error!'})
    })
}
