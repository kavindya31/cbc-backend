import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req, res) {
  try {
    if(isAdmin(req)){
    const products = await Product.find();
    res.json(products)
    }else{
      const products = await product.find({isAvailable :true})
      res.json(products)
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to get products",
      error: err.message,
    });
  }
}

export async function saveProducts(req, res) {
  // ✅ Only one clear authorization check
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "You are not authorized to add a product",
    })
    return
  }

  try {
    const product = new Product(
        req.body
    );

    await product.save();

    res.status(201).json({
      message: "✅ Product added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to add product",
      error: error.message,
    });
  }
}
export async function deleteProduct(req,res){
   if(!isAdmin(req)){
    res.status(403).json({
      message:"you are not authorized to delete a products"
    })
    return
  }
  try{
      await Product.deleteOne({productId:req.params.productId})

    res.json({
      message:"product deleted successfully"
    })
   }catch(err){

    //server side error
         res.status(500).json({
          message:"failed to delete product",
          error:err
         })  
   }
}

export async function updateProduct(req,res){
  if(!isAdmin(req)){
    res.status(403).json({
      message:"you are not authorized to update product"
    })
    return
  }
  const productId=req.params.productId
  const updatingData=req.body
  try{
    await Product.updateOne({
      productId:productId
    },
  updatingData)

  res.json({
    message:"product updated successfully"
  })

  }catch(err){
    res.status(500).json({
      message:"Internet server error",
      error:err
    })
     
  }
}

export async function getProductById(req,res){
  const productId=req.params.productId

  try{
    const product=await Product.findOne({
      productId:productId
    })
    if(product == null){
      res.status(404).json({
        message:"product not found"
      })
      return
    }
    if(product.isAvailable){
      res.json(product)
    }else{
      if(!isAdmin(req)){
        res.status(404).json({
          message:"Product not found"
        })
        return
      }else{
        res.json(product)
      }
    }
  }catch(err){
    res.status(500).json
({
  message :"Internet server error",
  error:err
});
  }
}

