import express from "express"
import getProducts, { addProduct, getProductById, login, signup } from "../controller/controller.js"

const router=express.Router()


// router.get("/home",(req,res)=>{
//     res.json("route working ")
// })
router.get("/home",(req,res)=>{
    res.send("hi im working fine")
})

// router.get('/getproducts',getProducts)
router.get('/getproducts',async(req, res) => {

    try {
        const response = await Product.find();
        if (response) {
            res.json({ data: response, message: "successful" }).status(200)
        }
    } catch (err) {
        res.json({ message: "product not found" }).status(500)
    }}
)
router.post("/addproducts",addProduct)
router.get("/getProducts/:id",getProductById)
router.post("/signup",signup)
router.post("/login",login)
// router.post("/api/cart",cart)
export default router