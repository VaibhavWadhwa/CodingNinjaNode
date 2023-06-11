const mongoose = require('mongoose');

const storiesSchema =  new mongoose.Schema({
    image : String
})

const Story = new  mongoose.model("story",storiesSchema);
module.exports = Story;