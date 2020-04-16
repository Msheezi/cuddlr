const express = require('express')
const router = express.Router()
const Conversation = require("../models/conversation")
const Message = require("../models/message")

// get conversations
router.get("/:id", (req,res)=>{
    let id = req.params.id
    Conversation.find({"participants": id })
    .then(convo => res.json(convo))
})

router.post("/:id", (req,res)=> {
    // let id = req.params.id
    let newConversation = new Conversation(req.body)
    newConversation.save().then(conversation => res.json(conversation))
})

//get conversation threads

router.get("/threads/:id", (req,res)=>{
    let id = req.params.id
    Message.find({"conversationId": id}, null, {sort:{timeSent: -1}} )
    .then(threads => res.json(threads))
})

router.post("/threads/:id", (req,res)=> {
    // let id = req.params.id 
    let newMessage = new Message(req.body)
    newMessage.save()
     .then(message => res.json(message))
})



module.exports = router