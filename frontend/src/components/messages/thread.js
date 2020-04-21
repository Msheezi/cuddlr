import React from "react";
import {  getThreadByConvoId, postMessage } from "../../util/messages_util";


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

    if (this.state.rerender){
      getThreadByConvoId(this.props.conversationId).then((convoList) => {
        this.setState({ messages: convoList.data, loaded: true, rerender:false });
      });
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
        <div>
          <input
            style={{ width: "100%" }}
            placeholder="Type to Chat"
            onChange={(e) => this.handleChange(e)}
            value={this.state.messageResponse}
          />
          <button onClick={() => this.handleMessage()}>Send</button>
        </div>
      </div>
    );
  }
}


export default Thread;
