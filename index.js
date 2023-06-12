const express = require('express');
const MongoClient = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const config = require('./config/config');
const userRouter = require('./routes/user');
const storyRouter = require('./routes/story');
const checkoutRouter = require('./routes/checkout');
const auth = require('./middleware/auth');

const app = express();

app.use(cors({
    origin: `*`,
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/story", storyRouter);
app.use("/api/payment", checkoutRouter)
app.get("/api/getCookie", auth, (req, res) => {
    res.status(200).json({
        err: false,
        message: "success",
        jwt: req.cookies.jwt || "",
        username: req?.user?.name || "",
        email: req?.user?.email || "",
        courses: req?.user?.courses || []
    })
})
app.use(express.static("client/build"));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(config.PORT, () => {
    MongoClient.connect("mongodb+srv://Aishwarya:Aishwarya@cluster0.n2jwfug.mongodb.net/?retryWrites=true&w=majority").then(res => {
        console.log("connected to Mongo DB")
    }).catch(err => console.log("err"))
    console.log(`server running at port ${config.PORT}`)
})
