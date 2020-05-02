import styled from 'styled-components'

export const ConverationContainer = styled.div`
  margin: 10px auto;
  max-height: 80vh;
  width: 80vw;
  height: 60vh;
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 1fr;
  grid-template-rows: 50px auto 50px;
  grid-template-areas:
    ". heading heading ."
    " . conversationList thread . "
    " . conversationList input . ";

`;

export const Conversation = styled.div`
  grid-area: conversationList;
  border: 1px solid lightgray;
background-color: "#fff";
  max-height: 60vh;
`;

export const Threads = styled.div`
  grid-area: thread;
  border: 1px solid lightgray;
  padding: 5px;
  background-color: #fff;
  max-height: 50vh;
  overflow-y: auto;
`;

export const Heading = styled.div`
  grid-area: heading;
  text-align: center;
  font-size: 22pt;
`;

export const ConversationItem = styled.div`
  height: 50px;
  cursor:pointer;
  border-bottom: 1px solid lightgray;
  background-color: ${props => props.color || "#fff"};
  &:hover{
    transition: background-color 0.15s ease-in;
    background-color: #ACEDEF;
  }
`

export const AvatarImage = styled.img`
height: 40px; 
margin: 5px;
vertical-align: middle;

`
export const AvatarText = styled.p`
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

export const MessageInput = styled.input`
  width: 80%;
  position: absolute;
  bottom: 0px;
  box-sizing: border-box;
  border: none;
  height: 100%;
  padding: 5px;
`

export const SubmitButton = styled.button`
    justify-self: flex-end;
    position:absolute;
    right: 0px;
    background-color: #0066FF;
    color: #fff;
    border: none;
    border-radius: 5px;
    /* margin: 10px 5px 0px 0px; */
    height: 49px;
    width: 80px;
    cursor: pointer;
    
`