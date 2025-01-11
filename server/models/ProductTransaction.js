const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/RoxillerSystem")
    .then(() => {
        console.log("Database Connected")
    })
    .catch(() => {
        console.log("Database Disconnected due to ",error)
    })

const ProductTransactionSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: mongoose.Types.Decimal128,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    sold:{
        type: Boolean,
        required: true
    },
    dateOfSale:{
        type: Date,
        required: true
    }
}) 
    
const ProductTransaction = mongoose.model('ProductTransaction', ProductTransactionSchema)

module.exports = ProductTransaction
