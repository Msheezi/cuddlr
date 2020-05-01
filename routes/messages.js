const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const User = require("../models/user");
// get list of conversations user is a part of by finding docs with this
// current users id
// on load, get a list of all users they have conversations with and store in
// redux with the profile pick link and user name, match to users in the messages
// component, prevents a rough backend creation here
router.get("/conversations/:userId", (req, res) => {
  let id = req.params.userId;
  Conversation.find(
    { participants: id },
    { _id: 1, participants: 1 }
  ).then((convo) => res.json(convo));
});

// use conversation ID to get thread details
// returns array of message objects sorted oldest to newest
// test data 5e9c91f29e42a21519b4e8d0
router.get("/conversations/threads/:convoId", (req, res) => {
  let id = req.params.convoId;
  Message.find(
    { conversationId: id },
    { __v: 0 },
    {
      sort: { timeSent: 1 },
    }
  ).then((threads) => res.json(threads));
});

router.post("/postmessage", (req, res) => {
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
      /* 
       assuming this is being sent from a location where the conversationId
       is not being sent with the request.
       find the conversation with the participants
       get the conversation id, post the message to correct conversation
      */
      if (result) {
        Conversation.find(
          { $or: [{ participants: id1 }, { participants: id2 }] },
          { _id: 1 }
        ).then((conversation) => {
          message.conversationId = conversation[0]._id;
          newMessage = new Message(message);
          newMessageconversationId = conversation._id;
          newMessage.save().then((message) => res.json(message));
        });
      }
    }
  );
});

// use this to load the redux state when going to messages page,
// this will allow me to get relevant data into the sidebar
router.get("/messagedUsers/:id", (req, res) => {
  let currentUser = req.params.id;
  // username, profilephoto, _id
  // { "_id": 1, "username": 1, "mainProfilePic": 1 }
  const userList = [];
  Conversation.find(
    { participants: currentUser },
    { participants: 1 },
    function (err, docs) {
      docs.forEach(({ participants }) => {
        participants.forEach((el) => {
          if (el !== currentUser) {
            userList.push(el);
          }
        });
      });
      User.find(
        { _id: userList },
        { username: 1, mainProfilePic: 1 }
      ).then((users) => res.json(users));
    }
  );
});

module.exports = router;
