import React from "react";
import {  getThreadByConvoId, postMessage } from "../../util/messages_util";
import { StyledInputDiv, ThreadContainer, MessageWindow } from './threadStyles'


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
      })}
    if (this.props.messages !== prevProps.messages) {
      getThreadByConvoId(this.props.conversationId).then(convoList => {
        this.setState({ messages: convoList.data, loaded: true })
      })
    }
    
    }


  
  

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
      <ThreadContainer>
        <MessageWindow>
          {messages}
        </MessageWindow>
        {/* <StyledInputDiv>
          <input
            style={{ width: "100%" }}
            placeholder="Type to Chat"
            onChange={(e) => this.handleChange(e)}
            value={this.state.messageResponse}
          />
          <button onClick={() => this.handleMessage()}>Send</button>
        </StyledInputDiv> */}
      </ThreadContainer>
    );
  }
}


export default Thread;
