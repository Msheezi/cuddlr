import React from "react";
import { withRouter } from "react-router-dom";

import {
    Screen, 
    ModalContainer,
    MessageBox,
    MessageButton,
} from './modalStyles'


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
