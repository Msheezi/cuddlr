const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const User = require("../models/user")

// test users

// 5e729be9e4afbc3899864aca
//5e9675e830b5ce3d28676e14


// get conversations  this needs to group by conversation
// find conversations where userID is in participants array,
// then retrieve messages by conversation

router.get("/conversations/:userId", (req, res) => {
  // console.log(req.body)
  // get list of conversations user is a part of by finding docs with this
  // current users id
  let id = req.params.userId;
  // use Id to get the current users details
  // for each conversation, build and insert and obj

  // on load, get a list of all users they have conversations with and store in 
  // redux with the profile pick link and user name, match to users in the messages
  // component, prevents a rough backend creation here
  let participantDetails = {}
  Conversation.find({ "participants": id },{"_id": 1, "participants": 1})
  .then((convo) => res.json(convo));
  // have conversation list, now want to include the username, 
  //and profile url for each user in the response

  // {participants: [], _id: "", participantDetails: {id1{ }}}

  // want to append this to each detail in participant
  // participantDetails: { 
  //   id1:{username: username, mainProfilePic: "" } 
  // }

});


// use conversation ID to get thread details
// returns array of message objects sorted oldest to newest
// test data 5e9c91f29e42a21519b4e8d0
router.get("/conversations/threads/:convoId", (req, res) => {
    let id = req.params.convoId;
    Message.find({ "conversationId": id }, {"__v":0}, {
        sort: { "timeSent": 1 },
    }).then((threads) => res.json(threads));
});

router.post("/posttest", (req, res) => {
  // let id = req.params.id
  // console.log(req.body)

  let newConversation = new Conversation(req.body);
  newConversation.save().then((conversation) => res.json(conversation));
});

//get conversation threads

router.post("/postmessage", (req, res) => {
  //this needs to be a post type
  //find conversation if conversation, save message with ID
  // if no conversation, new Conversation => coversation.id save new message
  let { conversationId, senderId, content } = req.body;
  let userId = req.body.userId;
  let id1 = [req.body.id1, req.body.id2];
  let id2 = [req.body.id2, req.body.id1];
  
  let message = {
    conversationId: conversationId,
    senderId: senderId,
    content: content,
  };

  let newMessage;
  Conversation.exists(
    { $or: [{ participants: id1 }, { participants: id2 }] },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      // If conversation not found, create one and assign messages to that ID
      if (!result) {
        let newConvo = new Conversation({ userId: userId, participants: id1 });
        newConvo.save().then((conversation) => {
          message.conversationId = conversation._id;
          newMessage = new Message(message);
          newMessage.save().then((message) => res.json(message));
        });
      }
      // assuming this is being sent from a location where the conversationId
      // is not being sent with the request.
      // find the conversation with the participants
      // get the conversation id, post the message to correct conversation
      if (result) {
        Conversation.find({ $or: [{ "participants": id1 }, { "participants": id2 }]}, {"_id": 1})
        .then(conversation=> {
          message.conversationId = conversation[0]._id
          newMessage = new Message(message);
          newMessageconversationId = conversation._id
        newMessage.save().then((message) => res.json(message));
        })
        
      }

    }
  );

  // Conversation.find({ $or:[ {"participants":id1 }, {"participants": id2}]})
  // .then(conversation=> res.json(conversation))
  // res.send("this is a test")
});



router.post("/threads/:id", (req, res) => {
  // let id = req.params.id
  let newMessage = new Message(req.body);
  newMessage.save().then((message) => res.json(message));
});


// router.get("/messagedUsers", (req, res)=>{
//   let currentUser = req.body.currentUser
//   // username, profilephoto, _id 
//   // { "_id": 1, "username": 1, "mainProfilePic": 1 }
//   const userList = []
//   Conversation.find({"participants": currentUser}, {"participants": 1} )
//   .then(userListArray=> {
//     userListArray.forEach(({participants})=> {
//       participants.forEach(el => {
//         if (el !== currentUser){
//           userList.push(el)
//         }
//       })
//     })
//     // res.send(userList)console.log(userList)
//     console.log(userList)
//     User.find({"_id": userList},{"username": 1, "mainProfilePic": 1, "_id": 1})
//   })
//   .then(users => res.json(users))
    


// })
// use this to load the redux state when going to messages page,
// this will allow me to get relevant data into the sidebar
router.get("/messagedUsers", (req, res) => {
  let currentUser = req.body.currentUser
  // username, profilephoto, _id 
  // { "_id": 1, "username": 1, "mainProfilePic": 1 }
  const userList = []
  Conversation.find({ "participants": currentUser }, { "participants": 1 }, function(err, docs){
    docs.forEach(({ participants }) => {
      participants.forEach(el => {
        if (el !== currentUser) {
          userList.push(el)
        }
      })
    })
    console.log(userList)
    User.find({ "_id": userList }, { "username": 1, "mainProfilePic": 1,})
    .then(users => res.json(users))
  }) 
    // .then(userListArray => {
    //   userListArray
    //   // res.send(userList)console.log(userList)
    })





module.exports = router;
