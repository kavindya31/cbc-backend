/*import Order from "../models/order.js"

export async function createOrder(req,res){
    //get user information

    if(req.user==null){
        res.status(403).json({
            message:"please login and try again"
        })
    }
    const orderInfo = req.body;

    if(orderInfo.name ==null){
        orderInfo.name=req.user.firstName + " " +req.user.lastName    }
    //add curent user name if not provided
    //order id generated

    //CBC00001

    let orderId ="CBC00001"
    const lastOrder=await Order.findOne().sort({date:-1}).limit(1)

    if(lastOrder.length >0){
        const lastOrderId=lastOrder[0].orederId
        //CBC00345
        const lastOrderNumberString = lastOrderId.replace("CBC","")
        //00345
        const lastOrderNumber=parseInt(lastOrderNumberString
            //345
        )
        const newOrderNumber= lastOrderNumber+1
        //346
        const newOrderNumberString =String(newOrderNumber).padStart(5,'0');
        orderId="CBC"+newOrderNumberString
        //CBC00346
    }
    //current order object

    const order = new Order({
        orderId:orderId,
        email:req.user.email,
        phone:orderInfo.phone,
        name:orderInfo.name,
        address:orderInfo.address,
        total:0,
        products:[]
    })
    try{
        const createOrder = await order.save(
            res.json({
                message:"order created successfully",
                error:err
            })
        )
 
    }catch(err){
        res.status(500).json({
             message:"failed to create order",
             error:err
        })
    }
}
*/
import Order from "../models/order.js";
import Product from "../models/product.js"; 
export async function createOrder(req, res) {
    // Check user login
    if (!req.user) {
        return res.status(403).json({
            message: "Please login and try again",
        });
    }

    const orderInfo = req.body;

    // Add current user name if not provided
    if (!orderInfo.name) {
        orderInfo.name = req.user.firstName + " " + req.user.lastName;
    }

    // Order ID generation
    let orderId = "CBC00001";

    try {
        const lastOrder = await Order.findOne().sort({ date: -1 });

        if (lastOrder) {
            const lastOrderId = lastOrder.orderId;
            const lastOrderNumberString = lastOrderId.replace("CBC", "");
            const lastOrderNumber = parseInt(lastOrderNumberString);
            const newOrderNumber = lastOrderNumber + 1;
            const newOrderNumberString = String(newOrderNumber).padStart(5, "0");
            orderId = "CBC" + newOrderNumberString;
        }

        try {
            let total = 0;
            let labelledTotal = 0;
            const products = [];

            for (let i = 0; i < orderInfo.products.length; i++) {
                const item = await Product.findOne({
                    productId: orderInfo.products[i].productId,
                });

                if (!item) {
                    return res.status(404).json({
                        message: `Product with productId ${orderInfo.products[i].productId} not found`,
                    });
                }

                if (!item.isAvailable) {
                    return res.status(404).json({
                        message: `Product with productId ${orderInfo.products[i].productId} is not available right now`,
                    });
                }

                const qty = orderInfo.products[i].quantity || orderInfo.products[i].qty || 1;

                products.push({
                    productInfo: {
                        productId: item.productId,
                        name: item.name,
                        altNames: item.altNames,
                        description: item.description,
                        images: item.images,
                        labeledPrice: item.labeledPrice ?? item.labelledPrice, // ✅ spelling fix
                        price: item.price,
                    },
                    quantity: qty,
                });

                total += item.price * qty;
                labelledTotal += (item.labeledPrice ?? item.labelledPrice) * qty;
            }

            // Create the order object
            const order = new Order({
                orderId,
                email: req.user.email,
                phone: orderInfo.phone,
                name: orderInfo.name,
                address: orderInfo.address,
                labelledTotal,
                total,
                products,
            });

            await order.save();

            res.status(201).json({
                message: "Order created successfully",
                order,
            });
        } catch (err) {
            res.status(500).json({
                message: "Failed to create order",
                error: err.message,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to create order",
            error: err.message,
        });
    }
}
