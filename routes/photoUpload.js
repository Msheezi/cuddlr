require('dotenv').config()
const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const UserPicture = require("../models/userPicture");
const User = require("../models/user")


router.post("/upload", upload.single('file'), (req, res) =>{
//    console.log(req)
   const file = req.file 
    const primary = req.body.profilePrimary
    const userId = req.body.userId
    const s3FileURL = process.env.AWS_Uploaded_File_URL_Link
    // this should update the profile avatar with  the new photo if primary is selected
    // if (primary){
    //     User.findOneAndUpdate({"_id": userId}, {"pictureUrl": s3FileUrl}, {new:true})
    // }
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
            res.send({data})
            const newFileUploaded = {
              userId: req.body.userId,
              pictureUrl: s3FileURL + file.originalname,
              profilePrimary: primary
            };

            const userPicture = new UserPicture(newFileUploaded)
            
            // add in conditional to update user model with primary photo if it is selected
                userPicture.save((error, newFile) => {
              if (error) {
                throw error.Message;
            }
            // need to wipe all the current primaries from the userPicture, changed above
                
            })
        }
    })
    if (primary) {
        User.findOne({ "_id": userId }, (err, userData) => {
            userData.mainProfilePic = s3FileURL + file.originalname
            userData.save()
        })
    }
    // res.json(newFile)
})


module.exports = router