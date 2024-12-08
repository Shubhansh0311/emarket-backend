import express from "express"
import getProducts, { addProduct, getProductById, login, signup } from "../controller/controller.js"
import { Product } from "../modals/Products.js"

const router=express.Router()


// router.get("/home",(req,res)=>{
//     res.json("route working ")
// })
router.get("/home",(req,res)=>{
    res.send("hi im working fine")
})
router.get('/data',async(req,res)=>{
   try {
    const response=await Product.insertMany(req.body)
    res.json({message:'data added successfully',response:response})   } 
    catch (error) {
        res.json({message:'unable to add data',status:'failed'}) 
   }


})
router.get('/getproducts',getProducts)
router.post("/addproducts",addProduct)
router.get("/getProducts/:id",getProductById)
router.post("/signup",signup)
router.post("/login",login)
// router.post("/api/cart",cart)
export default router