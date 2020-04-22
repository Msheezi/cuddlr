import React from "react";
import {  getThreadByConvoId } from "../../util/messages_util";
import Thread from "./thread"
import {Loader} from '../spinner/spinner'
import {
  ConverationContainer,
  Conversation,
  Threads,
  Heading,
  ConversationItem,
  AvatarImage,
  AvatarText,
  StyledInputDiv,
  MessageInput,
  SubmitButton,
} from './conversationStyles'



export class Conversations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedConversation: "",
      loaded: false,
      messageResponse: "",
      
    };
  }

    componentDidMount() {
  // conversation.data is an array of objects
      // Update store with: messaged users and all conversations
      // set state with the first conversation in the list
      // need the case for no values
    let userId = this.props.currentUserId;
     this.props.fetchConversations(userId)
     this.props.fetchMessagedUsers(userId)
    .then(() => this.setState({
      loaded: true,
      selectedConversation: this.props.messages[0]._id,
      participants: this.props.messages[0].participants,
    }))
      
  }

  handleChange(e) {
    this.setState({ messageResponse: e.target.value })
  }

  // find the correct convo obj in conversations and update participants for
  // sending messages later
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
            src={this.props.messagedUsers[otherUser].mainProfilePic || "https://cuddlr-dev.s3-us-west-1.amazonaws.com/blankpic.webp" }
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
              <SubmitButton  onClick={() => this.handleMessage()}>Send</SubmitButton>
            
            </StyledInputDiv>
        </ConverationContainer>
      );
  } else {
      return <Loader />;
  }
  }
}

export default Conversations;

