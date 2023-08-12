require('dotenv').config();
const express = require('express');
const { env } = require('process');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/post')
const categoryRoute = require('./routes/categories')
const multer = require('multer');
const path = require('path');



const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


mongoose.connect(process.env.MONG_URI).then(console.log('Connected to mongo '))
    .catch((err) => console.log(err))

//IMAGE UPLOAD FUNCTIONS
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });


app.post("/api/upload", upload.single("file"), (req, res) => {
    return res.status(200).json("File has been uploaded")
})


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/category', categoryRoute);


app.listen(process.env.PORT, () => {
    console.log(`server start on port ${process.env.PORT}`);
})