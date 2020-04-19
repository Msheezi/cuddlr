import React from "react";
import styled from "styled-components";
import { getConversations } from "../../util/messages_util";
import Thread from "./thread";

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

export class Conversations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedConversation: "",
    };
  }

  async componentDidMount() {
    let userId = this.props.currentUserId;
    let conversations = await getConversations(userId);
    // let threads = await getTheads(conversation._id)

    this.setState({
      conversations: conversations.data,
    });
  }

  // filter for conversations this user is a part of
  // on click render that list of messages using a function component

  render() {
    return (
      <ConverationContainer>
        <Heading>Balls</Heading>
        <Conversation>
          <div>Hello I'm Conversations placeholder</div>
        </Conversation>
        <Threads>
          <div>Hello I'm Thread Placeholder</div>
        </Threads>
      </ConverationContainer>
    );
  }
}

export default Conversations;
