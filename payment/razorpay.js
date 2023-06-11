const Razorpay = require('razorpay'); 
  

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_VEjTEHhjyw0SQz",
    key_secret: "LfOPg1ph6zq4ElIyPXFn3sDM"
});

module.exports = razorpayInstance