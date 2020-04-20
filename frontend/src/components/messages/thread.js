import React from "react";
import {  getThreadByConvoId, postMessage } from "../../util/messages_util";


class Thread extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      loaded: false
    }
  }

  componentDidMount(){
    getThreadByConvoId(this.props.conversationId).then(convoList=> {
      this.setState({messages: convoList.data, loaded: true})
    })
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

      </div>
    )
  }
}


export default Thread;
