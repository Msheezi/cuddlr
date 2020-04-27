import React from "react";
import {  getThreadByConvoId } from "../../util/messages_util";
import { ThreadContainer, MessageWindow, MessageBubble } from './threadStyles'


class Thread extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      loaded: false,
      messageResponse: "",
      rerender: false
    }
  }

  componentDidMount(){
    getThreadByConvoId(this.props.conversationId).then(convoList=> {
      this.setState({messages: convoList.data, loaded: true}, this.advance())
    })
  }

  advance() {
    this.chatInterval = setInterval(() => {
      getThreadByConvoId(this.props.conversationId).then(convoList => {
        this.setState({ messages: convoList.data, loaded: true })
      })
      
    }, 5000);
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.conversationId !== prevProps.conversationId){
      getThreadByConvoId(this.props.conversationId).then(convoList => {
        this.setState({ messages: convoList.data, loaded: true })
      })}
    if (this.props.messages !== prevProps.messages) {
      getThreadByConvoId(this.props.conversationId).then(convoList => {
        this.setState({ messages: convoList.data, loaded: true })
      })
    }
    
    }

  componentWillUnmount() {
    clearInterval(this.chatInterval);

  }

  
  

  handleChange(e){
    this.setState({messageResponse: e.target.value})
  }

  render() {
    let messages
    if (this.state.loaded){
      //  messages = this.state.messages.map(messageObj=> (
      //   //assign a align self direction based on the user id
      //    <MessageBubble key={messageObj._id}>{messageObj.content}</MessageBubble>
      // ))
       messages = this.state.messages.map(messageObj=> {
          let alignment = messageObj.senderId === this.props.currentUser ? "flex-end" : "flex-start"
         let color = messageObj.senderId === this.props.currentUser ? "#58A4B0" : "#D8DBE2"
          //assign a align self direction based on the user id
          return (
            <MessageBubble color={color} alignment={alignment} key={messageObj._id}>{messageObj.content}</MessageBubble>
          )
        }
         )
       
    }

    return (
      <ThreadContainer>
        <MessageWindow>
          {messages}
        </MessageWindow>
        
      </ThreadContainer>
    );
  }
}


export default Thread;
