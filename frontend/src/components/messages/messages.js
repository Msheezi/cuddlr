import React from 'react'
import styled from 'styled-components'
import {getConversations} from '../../util/messages_util'

export class Messages extends React.Component{
    constructor(props){
        super(props)
    
        this.state = {

        }
    }

   async componentDidMount(){
    let userId = this.props.currentUserId   
    let conversations = await getConversations(userId)
        // let threads = await getTheads(conversation._id)

        this.setState({
            conversations: conversations,
           
        })
    }

    // filter for conversations this user is a part of 
    // on click render that list of messages using a function component

    render(){
        return (<div>Hello I'm Messages</div>)
    }
}

export default Messages