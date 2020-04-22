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
`

const ModalContainer = styled.div`
  position: fixed;
  background: white;
  width: 90%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const MessageBox = styled.input`

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
                        <button onClick={(e)=>this.handleMessage(e)}>Send</button>
                    </ModalContainer>
                </Screen>


    )
    }else {
        return null
    }
    }
}


export default withRouter(MessageModal);
