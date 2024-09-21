const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const isauthenticated = require('../middlewares/isauthenticated');
const Users = require("../schemas/userSchema");
const Orders = require("../schemas/orderSchema");

router.get("/get-stripe-publish-key", async (req, res) => {
  try {
    return res.send({
      success: true,
      publicKey: process.env.STRIPE_PUBLIC_KEY,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.post('/process-payment',async(req,res)=>{
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount:100000,
      currency: 'INR',
      metadata:{
        company:'LMS',

      },
      automatic_payment_methods:{
        enabled: true,
      },
      description:'lms course ',
      shipping:{
        name:'user name',
        address:{
          line1:'123 street',
          city:'user city',
          postal_code:57575,
          state:'punjab',
          country:'india'
        }
      }
    })

    return res.send({success:true,message:'payment procced ',client_secret:myPayment.client_secret})
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
})

router.post('/createOrder',isauthenticated, async(req,res)=>{
  try {
    const isuser = await Users.findOne({_id:req.user._id,isvarified:true});

    if(!isuser) return res.send({success:false,message:'user not found'});

    const neworder = await Orders(req.body).save()

    isuser.courses = [...isuser.courses,req.body?.course?._id]

    await isuser.save()

    return res.send({success:true,message:'order created successfully'});

    
  } catch (error) {
    console.log(error.message)
    return res.send({ success: false, message: error.message });
  }
})



module.exports = router;
