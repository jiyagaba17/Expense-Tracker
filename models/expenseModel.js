const mongoose = require('mongoose');


//creating new instance , coming from mongoose schema
const ExpenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim:true, //get rid of the spaces
        maxLength: 50
    },
    amount:{
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type:{
        type: String,
        default: "expense"
    },
    date:{
        type: Date,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
}, 
//timestamps for when we created item or when updated
{timestamps: true}
)


module.exports = mongoose.model('Expense', ExpenseSchema)