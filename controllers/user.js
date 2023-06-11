const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


const User = require("../models/user");

const userRegisterController = (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    bcrypt.genSalt(10).then(salt => {
        return bcrypt.hash(password, salt)
    }).then(hash => {
        const registerDetails = new User({
            name,
            email,
            password: hash,
            courses : []
        })

        registerDetails.save().then(re => {
            res.status(200).json({
                error: false,
                message: "success"
            })
        }).catch(err => {
            res.status(401).json({
                error: true,
                message: err
            })
        })
    })
}


const userLoginController = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const data = await User.findOne({ email });

        const err = await bcrypt.compare(password, data.password);
        if (!err) {
            res.status(200).json({
                error: false,
                isUserLoggedIn: false,
                message: "Invalid details",
                username: "",
                email : "",
                courses : []
            });
        } else {
            const token = await jwt.sign({ _id: data._id }, config.SECRET_KEY, {
                expiresIn: "1h"
            });
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 60000000),
                httpOnly: true,
                secure : true,
                domain : "https://tangerine-strudel-11ccfe.netlify.app/"
                
            })
            res.status(200).json({
                error: false,
                isUserLoggedIn: true,
                username: data.name,
                email : data.email,
                courses : data.courses,
                message: "Valid details"
            })
        }
    } catch (err) {
        res.status(200).json({
            error: true,
            isUserLoggedIn: false,
            message: err,
            username: "",
            email : "",
            courses : []
        });
    }

}

const updateUserController = async (req,res) =>{
try{
    const email = req.body.email;
    const course = req.body.course;
    const data = await User.findOne({ email });
    console.log("data",data)
    const existingList =  data?.courses || [];
    existingList.push(course.trim());
console.log(existingList)
  const result = await  User.updateOne({email},{$set : {
    courses : existingList
  } })
  console.log(result)
  res.status(200).json({
    error : false,
    message : "success",
    courses : existingList
  })
}catch(err){
    res.status(401).json({
        error : true,
        message : "failure",
        courses : existingList
      })
}
}

const userLogoutController = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({
            error: false,
            message: "Logged out successfully"
        })
    } catch (err) {
        res.status(401).json({
            error: true,
            message: err
        })
    }

}

const initialLoader = (req, res) => {
    console.log(req.cookies.jwt)
}


module.exports = {
    userLoginController,
    userRegisterController,
    userLogoutController,
    initialLoader,
    updateUserController

}
