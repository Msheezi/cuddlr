import React from "react";
import {  getThreadByConvoId, postMessage } from "../../util/messages_util";
import styled from 'styled-components'

const StyledInputDiv = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s all;

`;


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
      this.setState({messages: convoList.data, loaded: true})
    })
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.conversationId !== prevProps.conversationId){

      getThreadByConvoId(this.props.conversationId).then(convoList => {
        this.setState({ messages: convoList.data, loaded: true })
      })
    }

    
  }


  handleMessage(){
    if (this.state.messageResponse !== ""){

      let message = {
        id1: this.props.participants[0],
        id2: this.props.participants[1],
        senderId: this.props.currentUser,
        content: this.state.messageResponse
      }
      
      this.props.postMessage(message)
      .then(()=> getThreadByConvoId(this.props.conversationId))
      .then((convoList) => {
        this.setState({ messages: convoList.data, loaded: true, rerender:false, messageResponse:"" })
      
    })}}
  

  handleChange(e){
    this.setState({messageResponse: e.target.value})
  }

  render() {
    let messages
    if (this.state.loaded){
       messages = this.state.messages.map(messageObj=> (

        <div key={messageObj._id}>{messageObj.content}</div>
      ))
       
    }

    return (
      <div>
        {messages}
        <StyledInputDiv>
          <input
            style={{ width: "100%" }}
            placeholder="Type to Chat"
            onChange={(e) => this.handleChange(e)}
            value={this.state.messageResponse}
          />
          <button onClick={() => this.handleMessage()}>Send</button>
        </StyledInputDiv>
      </div>
    );
  }
}


export default Thread;
