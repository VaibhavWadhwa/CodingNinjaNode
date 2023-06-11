const Story = require("../models/story");

const userStoryController  = async (req,res) =>{
try{
const data = await Story.find({});
res.status(200).json({
    error : false,
    data : data,
    message : "success"
})

}catch(err){
    res.status(200).json({
        error : true,
        data : {},
        message : err
    })
}
}

module.exports = userStoryController;