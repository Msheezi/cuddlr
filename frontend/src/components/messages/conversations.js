import React from "react";
import styled from "styled-components";
import { getConversationList, getThreadByConvoId, postMessage } from "../../util/messages_util";
import Thread from "./thread"
import {Loader} from '../spinner/spinner'

const ConverationContainer = styled.div`
  margin: 10px auto;
  width: 80vw;
  height: 80vh;
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 1fr;
  grid-template-rows: 50px auto 50px;
  grid-template-areas:
    ". heading heading ."
    " . conversationList thread . "
    " . conversationList input . ";
`;

const Conversation = styled.div`
  grid-area: conversationList;
  border: 1px solid lightgray;
  background-color: #fff;
`;

const Threads = styled.div`
  grid-area: thread;
  border: 1px solid lightgray;
  padding: 5px;
  background-color: #fff;
  height: 100%;
`;

const Heading = styled.div`
  grid-area: heading;
  text-align: center;
`;

const ConversationItem = styled.div`
  height: 50px;

  border-bottom: 1px solid lightgray;
  &:hover{
    transition: background-color 0.15s ease-in;
    background-color: lightgray;
  }
`

const AvatarImage = styled.img`
height: 40px; 
margin: 5px;
vertical-align: middle;

`
const AvatarText = styled.p`
   display: inline; 
   vertical-align: center; 
`;

export const StyledInputDiv = styled.div`
  grid-area: input;
  display:flex;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border: 1px solid lightgray;
  /* height: 56px; */
  border-radius: 4px;
  position: relative;
  justify-self: baseline;
  /* background-color: rgba(255, 255, 255, 0.3); */
  transition: 0.3s all;
  box-sizing: border-box;

`;

const MessageInput = styled.input`
  width: 80%;
  position: absolute;
  bottom: 0px;
  box-sizing: border-box;
  border: none;
  height: 100%;
  padding: 5px;
`

export class Conversations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedConversation: "",
      loaded: false,
      messageResponse: "",
      
    };
  }

   async componentDidMount() {
  // conversation.data is an array of objects

    let userId = this.props.currentUserId;
     this.props.fetchConversations(userId)
     this.props.fetchMessagedUsers(userId)
    //  let messages = await getThreadByConvoId(this.props.messages[0]._id)
    .then(() => this.setState({
      loaded: true,
      selectedConversation: this.props.messages[0]._id,
      participants: this.props.messages[0].participants,
      // messages: messages
    }))
      
  }

  handleChange(e) {
    this.setState({ messageResponse: e.target.value })
  }
  handleClick(value){
    let conversation = this.props.messages.filter(objs => objs._id === value)
    let participants = conversation[0].participants
    this.setState({selectedConversation: value, participants: participants})
  }


  handleMessage() {
    if (this.state.messageResponse !== "") {
      let message = {
        id1: this.state.participants[0],
        id2: this.state.participants[1],
        senderId: this.props.currentUserId,
        content: this.state.messageResponse
      }

      this.props.postMessage(message)
        .then(() => getThreadByConvoId(this.state.selectedConversation))
        .then((convoList) => {
          this.setState({ messages: convoList.data, loaded: true, rerender: false, messageResponse: "" })

        })
    }
  }

  renderConversation() {
    
    let convoRender = this.props.messages.map(convoObj => {
    // get the particpants array and find the value that doesn't match the current user
      let otherUser = convoObj.participants.filter(id => id !== this.props.currentUserId).join()
      let convoId = convoObj._id
      return (
        <ConversationItem
          key={convoId}
          name={convoId}
          onClick={(e) => this.handleClick(convoId)}
        >
          <AvatarImage
            src={this.props.messagedUsers[otherUser].mainProfilePic}
          />
          <AvatarText>
            {this.props.messagedUsers[otherUser].username}
          </AvatarText>
        </ConversationItem>
      );
    }
    )
    return convoRender
  }
    
  render() {

    // let testConversation = this.getThread()
    
    if (this.state.loaded){
        let threadParticipants = this.props.messages.filter(obj=>obj._id === this.state.selectedConversation)
        return (
        <ConverationContainer>
          <Heading>Message Center</Heading>
          <Conversation>{this.renderConversation()}</Conversation>
          <Threads>
            
            <Thread
              messages={this.state.messages}
              conversationId={this.state.selectedConversation}
              participants={threadParticipants[0].participants}
              id1={this.props.messages.participants}
              postMessage={this.props.postMessage}
              currentUser={this.props.currentUserId}
            />
            {/* <Thread message={this.state.selectedConversation || ""}/> */}
          </Threads>
            <StyledInputDiv>
              
              <MessageInput
               
                placeholder="Type to Chat"
                onChange={(e) => this.handleChange(e)}
                value={this.state.messageResponse}/>
              <button style={{justifySelf: "flex-end", position:"absolute", right:"0px"}} onClick={() => this.handleMessage()}>Send</button>
            
            </StyledInputDiv>
        </ConverationContainer>
      );
  } else {
      return <Loader />;
  }
  }
}

export default Conversations;









    // console.log(conversations)

    // getMessages(this.props.messages)
  //  async function(this.props.messages) {

  //    this.props.messages.map(conversationObj =>{
  //      let id = conversationObj._id
  //      let thread = await this.props.fetchThread(id)
  //      return messages[id] = thread
  //     })
  //   }
    // let initialConvoId = this.props.messages[0]

    // let convoIds = conversations.data.map(convoObj => {
    //   return Object.values(convoObj)
    //    })
    // let threads = await getTheads(conversation._id)

    // this.setState({
    //   // conversations: convoIds,
    //   // conversations: conversations.data,
    //   // selectedConversation: initialConvoId,
    //   threads: messages,
    //   loaded: true
    //  });




  // componentDidUpdate(prevState){
  //   if( prevState.selectedConversation !== this.state.selectedConversation){
  //     getThreadByConvoId(this.state.selectedConversation).then(thread => {
  //       this.setState({ threads: thread.data})
  //     })
  //   }
  // }
  // filter for conversations this user is a part of
  // on click render that list of messages using a function component

  // async getThread(e){
    // pass the conversation id into the API request
    // let thread = await getThreadByConvoId("5e9c91f29e42a21519b4e8d0")
    // console.log(thread.data)
    // let myvalues = thread.data
    // return this.setState({threads: thread.data})
    //   this.setState({selectedConversation: myvalues})
      // thread is array of objects
  // }
  // const getMessages =  (messages) => {
//   messages.map( async conversationObj => {
//     let id = conversationObj._id
//     let thread = await this.props.fetchThread(id)
//     return messages[id] = thread
//   })
// }