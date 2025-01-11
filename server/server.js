const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ProductTransaction = require('./models/ProductTransaction')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:['http://localhost:3000'],
    methods:["GET","POST","PUT","DELETE"],
    credentials : true
}))

// Insert json Data to MongoDB Database
const getData = async () => {
    const url = `https://s3.amazonaws.com/roxiler.com/product_transaction.json`
    const response = await fetch(url)
    const jsonData = await response.json()
    const result = await ProductTransaction.insertMany(jsonData)
    if(result){
        console.log("data Inserted in Database")
    }else{
        console.log("Something Went Wrong")
    }
}

app.get('/home', async(req, res) => {
    try{
        // getData()
        const allResult = await ProductTransaction.find()
        const statResult = await ProductTransaction.find({},{
            dateOfSale: 1,
            sold: 1
        })
        const barChartResult = await ProductTransaction.find({},{
            dateOfSale: 1,
            price: 1
        })
        const pieChartResult = await ProductTransaction.find({},{
            dateOfSale: 1,
            category: 1
        })

        const result = {
            allResult : allResult,
            statResult: statResult,
            barChartResult: barChartResult,
            pieChartResult: pieChartResult
        }
        res.json(result)
    }catch(error){
        res.json({
            status: "Failed",
            Message: error
        })
    }
})

app.listen(8000,() => {
    console.log("Server is Running on http://localhost:8000")
})