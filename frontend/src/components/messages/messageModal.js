import React from "react";
import { withRouter } from "react-router-dom";
import styled from 'styled-components'


const Screen = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index:2;

`

const ModalContainer = styled.div`
  position: fixed;
  background: white;
  width: 400px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-items:center;
  align-items: center;
`

const MessageBox = styled.textarea`
    margin: 5% auto;
    height: 50%;
    width:80%;

`
const MessageButton = styled.button`
    width: 50px;
    background-color: #0066FF;
    color: #fff;
    border: none;
    border-radius: 5px; 
    align-self: center;
`

class MessageModal extends React.Component{
    constructor(props){
        super(props)

        this.state = { 
            messageResponse: ""

        }
    }

    handleChange(e) {
        e.stopPropagation()
        this.setState({ messageResponse: e.target.value })
    }

    handleMessage(e) {
        e.preventDefault()
        if (this.state.messageResponse !== "") {
            let targetUser = this.props.location.pathname.split("/")
            let targetUserId = targetUser[2]
            let message = {
                id1: this.props.currentUser,
                id2: targetUserId, 
                senderId: this.props.currentUser,
                content: this.state.messageResponse
            }

            this.props.postMessage(message).then(() => {
                this.modalClose()
                this.setState({ messageResponse: "" }) 
            })
         }
    }

    modalClose(e) {
        this.setState({messageResponse: ""})
        this.props.closeModal();
        
    }


    render(){
        if (this.props.messageModalOpen){

            
            return (
                <Screen onClick={(e)=>this.modalClose(e)}>
                    <ModalContainer onClick={e=> e.stopPropagation()}>
                        <MessageBox 
                        value={this.state.messageResponse}
                        onChange={(e)=>this.handleChange(e)}
                        placeholder="Type your message here"/>
                        <MessageButton onClick={(e) => this.handleMessage(e)}>Send</MessageButton>
                    </ModalContainer>
                </Screen>


    )
    }else {
        return null
    }
    }
}


export default withRouter(MessageModal);
