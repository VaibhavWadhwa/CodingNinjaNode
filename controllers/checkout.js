const razorpayInstance = require("../payment/razorpay")

const createOrderController  = async (req,res) =>{
    try{
        const {amount,currency,order_id, payment_capture}  = req.body;   
        const options = {
            amount : amount * 100,
            currency,
            receipt : order_id,
            payment_capture
        }       
      const order = await  razorpayInstance.orders.create(options)
      if(!order){
        console.log("SDSDD")
        res.status(200).json({
            error : true,
            message : "Payment failed"
        })
      }
      res.status(200).json({
        error : false,
        data : order,
        message : "success"
      })
    }catch(err){

    }

}

const cardDetailController = async (req,res) =>{
    try{
        const {razor_payment_id} = req.body;
        const order = await razorpayInstance.payments.fetch(razor_payment_id);
        if(!order){
            return res.status(200).json({
                error : true,
                message : "Payment failed"
            })
        }
        res.status(200).json({
            error : false,
            data : order,
            message : "success"
          })
    }catch(err){
   
    }
}

module.exports = {createOrderController,cardDetailController};