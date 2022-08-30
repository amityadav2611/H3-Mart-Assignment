const express = require('express');
const router = express.Router();

const axios = require('axios')
var xlsx = require("xlsx");

const getPrice = async (item) => {
    try{
        let fetch = {
            method: 'get',
            url: `https://api.storerestapi.com/products/${item}`
        }
        let {data} = await axios(fetch)
        return data.data.price
    }catch(err){
        console.log(err.message) 
    }
}

router.post('/productPrices', async (req,res)=>{
    try{
        let wb = xlsx.readFile("product_list.xlsx")
        let ws = wb.Sheets['Sheet1']
        let data = xlsx.utils.sheet_to_json(ws)
        for(let obj of data){
            obj.price = '₹' + await getPrice(obj.product_code) + '.00'
        }

        //creating new workbook
        let newWb = xlsx.utils.book_new()
        let newWs = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(newWb,newWs,"Price Data")
        xlsx.writeFile(newWb,"Items With Price.xlsx")
        // res.status(201).json({msg: "Success"})
        res.sendFile(__dirname.slice(0, -3) + 'Items With Price.xlsx')
    }catch(err){
        res.status(500).send({msg: err.message})
    }
})

module.exports = router
