import React from "react";
import styled from "styled-components";
import { getConversationList, getThreadByConvoId, postMessage } from "../../util/messages_util";
import Thread from "./thread"
import {Loader} from '../spinner/spinner'

const ConverationContainer = styled.div`
  margin: 10px auto;
  width: 80vw;
  height: 80vh;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 1fr;
  grid-template-rows: 50px auto;
  grid-template-areas:
    ". heading heading ."
    " . conversationList thread . ";
`;

const Conversation = styled.div`
  grid-area: conversationList;
  border: 1px solid green;
`;

const Threads = styled.div`
  grid-area: thread;
  border: 1px solid red;
`;

const Heading = styled.div`
  grid-area: heading;
  text-align: center;
`;

const ConversationItem = styled.div`
  height: 50px;
  border: 1px solid blue;
  &:hover{
    transition: background-color 0.15s ease-in;
    background-color: lightgray;
  }
`

export class Conversations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedConversation: "",
      loaded: false,
    };
  }

    componentDidMount() {
  // conversation.data is an array of objects

    let userId = this.props.currentUserId;
    this.props.fetchConversations(userId)
    .then(() => this.setState({
      loaded: true,
      selectedConversation: this.props.messages[0]._id
    }))
      
  }

  handleClick(value){
    this.setState({selectedConversation: value})
  }

  renderConversation() {
    let convoRender = this.props.messages.map(convoObj => (
      <ConversationItem
       key={convoObj._id} 
       onClick={()=>this.handleClick(convoObj._id)} >
         {convoObj._id}
      </ConversationItem>
    ))
    return convoRender
  }
    
  render() {

    // let testConversation = this.getThread()
    if (this.state.loaded){

      return (
        <ConverationContainer>
        <Heading>Balls</Heading>
        <Conversation>
          {this.renderConversation()}
        </Conversation>
        <Threads>
          <div>Hello I'm Thread Placeholder</div>
          <Thread conversationId={this.state.selectedConversation}/>
          {/* <Thread message={this.state.selectedConversation || ""}/> */}
        </Threads>
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