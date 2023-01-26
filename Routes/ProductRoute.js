const router = require('express').Router()
const {VerfiyAdmin} = require('../Controlers/Auth')
const { AddNewProduct, UpdateProduct, GetAllProducts, GetProductById, DeletProducById ,GetProductsStats ,GetProductInfo } = require('../Controlers/productControlers')
const cloudinary = require("../Controlers/Cloud");
const uploader = require("../Controlers/Multer");
const Product = require("../Models/product")
router.post("/", VerfiyAdmin, async function (request, response, next) {
   try {
      const NewProduct = await AddNewProduct(request.body)
      response.status(200).json(NewProduct)
   }
   catch (err) {
      response.status(401).json(err.message)
   }
})

router.put("/:id", VerfiyAdmin, async function (request, response, next) {
   try {
      const UpdatedProduct = await UpdateProduct(request.params.id, request.body)
      if (UpdatedProduct) {
         response.status(200).json(UpdatedProduct)
      } else {
         response.status(401).json("InCorrrect Product ID")
      }
   }
   catch (error) {
      response.status(401).json(error.message)
   }
})

router.get("/", async function (request, response, next) {
   try {
      let limit = request.query.limit || 10
      let skip = request.query.skip || 0
      let EnName = request.query.EnName 
      let ArName = request.query.ArName 
      let minprice = request.query.minprice 
      let maxprice = request.query.maxprice 
      let CatID=request.query.Categorie
      let SubCatID=request.query.SubCategorie
      let oldest = request.query.oldest
      let newest = request.query.newest
      let alphabetical=request.query.alphabetical
      let Products = await GetAllProducts(skip, limit, EnName, ArName, minprice, maxprice, CatID , SubCatID,oldest,newest,alphabetical)
      response.status(200).json(Products)
   }
   catch (err) {
      response.status(401).json(err.message)
   }
})

router.delete("/:id", VerfiyAdmin, async function (request, response, next) {

   try {
      const DeletMessag = await DeletProducById(request.params.id)
      response.status(200).json(DeletMessag)

   } catch (err) {
      response.status(401).json(err.message)
   }
})

router.get("/Stats/Results", VerfiyAdmin, async function (request, response, next) {
   try {
      const data = await GetProductsStats()
      response.status(200).json(data)
  }
  catch (error) {
      response.status(401).json(error.message)
  }
})

router.get("/ProductInfo", VerfiyAdmin, async function (request, response, next) {

   try {
       const data = await GetProductInfo()
       response.status(200).json(data)
   }
   catch (error) {
       response.status(401).json(error.message)
   }
})
router.get("/:id", async function (request, response, next) {
   try {
      const ProductData = await GetProductById(request.params.id)
      if (ProductData) {
         response.status(200).json(ProductData)
      } else {
         response.status(401).json("InCorrrect Product ID")
      }
   }
   catch (error) {
      response.status(401).json(error.message)
   }
})

router.post("/UploadProduct", uploader.single("Image"), async (req, res,next) => {
 try{
   console.log(req);
   const image = await cloudinary.uploader.upload(req.file.path);
console.log(image);
   const newProduct = new Product({
      EnName: req.body.EnName,
      ArName: req.body.ArName,
      Image: image,
      Amount: req.body.Amount,
      Price: req.body.Price,
      CategorieID: req.body.CategorieID,
      SubCategID: req.body.SubCategID,
  })
  console.log(newProduct);
 await newProduct.save()
   res.status(200).json(newProduct) 
 }  
 catch (error){
   res.status(500).json(error.message)
 }

 }) 
module.exports = router