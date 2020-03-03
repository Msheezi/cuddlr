require('dotenv').config()
const express = require('express')
const router = express.Router()
const multer = require('multer')
const AWS = require('aws-sdk')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const UserPicture = require("../models/userPicture");


router.post("/upload", upload.single("file"), (req, res) =>{
    const file = req.file 
    const s3FileURL = process.env.AWS_Uploaded_File_URL_Link

    let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
        region: process.env.AWS_REGION 
    })

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME, 
        Key: file.originalname,
        Body: file.buffer, 
        ContentType: file.mimetype, 
        ACL: "public-read"
    }

    s3bucket.upload( params, (err, data) => {
        if (err) {
            res.status(500).json({error: true, Message: err})
        } else {
            res.send({ data})
            const newFileUploaded = {
            //   description: req.body.description,
            //   fileLink: s3FileURL + file.originalname,
            //   s3_key: params.key,
              userId: req.body.userId,
              pictureUrl: s3FileURL + file.originalname, //params.key
              profilePrimary: false
            };
            const userPicture = new UserPicture(newFileUploaded)
            // add in conditional to update user model with primary photo if it is selected
                userPicture.save((error, newFile) => {
              if (error) {
                throw error.Message;
              }
            });
        }
    })
})


module.exports = router