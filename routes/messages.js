const express = require('express')
const router = express.Router()
const Conversation = require("../models/conversation")
const Message = require("../models/message")

// get conversations  this needs to group by conversation 
// find conversations where userID is in participants array,
// then retrieve messages by conversation
router.get("/test/:id", (req,res)=>{
    // console.log(req.body)
    let id = req.params.id
    Conversation.find({"participants": id })
    .then(convo => res.json(convo))
})

router.post("/posttest", (req,res)=> {
    // let id = req.params.id
    // console.log(req.body)

    let newConversation = new Conversation(req.body)
    newConversation.save().then(conversation => res.json(conversation))
})

//get conversation threads

router.get('/convos', (req, res) => {
    //this needs to be a post type
    //find conversation if conversation, save message with ID
    // if no conversation, new Conversation => coversation.id save new message
    // console.log(req.body.participants)
    let {conversationId, senderId, content} = req.body
    let userId = req.body.userId
    let id1 = [req.body.id1, req.body.id2]
    let id2 = [req.body.id2, req.body.id1]
    // let message = req.body.message //this should be an object
    let message = {"conversationId": conversationId, "senderId": senderId, "content": content}
    console.log(id1, id2)
    let newMessage
    Conversation.exists({ "$or": [{ "participants": id1 }, { "participants": id2 }] }, (err, result)=>{
        if (err){
            res.send(err)
        }
        if (!result){
            let newConvo = new Conversation({"userId": userId, "participants": id1})
            newConvo.save().then(conversation => {
              message.conversationId = conversation._id
                newMessage = new Message(message)
                newMessage.save().then(message => res.json(message))
            })
        }

        if (result){
            newMessage = new Message(message)
            newMessage.save().then(message=> res.json(message))
        }

        // res.json(message)
        // newMessage = new Message({message})

        // newMessage.save().then((message)=> res.json(message))
       
    })

    // Conversation.find({ "$or":[ {"participants":id1 }, {"participants": id2}]})
    // .then(conversation=> res.json(conversation))
    // res.send("this is a test")
})


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