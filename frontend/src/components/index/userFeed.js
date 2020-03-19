import React from 'react'
import styled from 'styled-components'
import {getProfiles } from '../../util/profiles_util'
import {UserFeedItem} from './userFeedItem'


const Wrapper = styled.div`
width: 80vw;
display: flex;
justify-content:space-between;
flex-wrap: wrap;

`


 class UserFeed extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
       // fetch users into state, consider pagination
       // valid this is passed in as an array of objects
       // pass objects to functional component to render
       getProfiles().then( profiles => {
        let data = profiles.data
            this.setState({data, loaded: true})
    
    })

    }

    


    render() {
        if (this.state.loaded) {

            let feedProfiles = this.state.data.map(userProfile =>(
                <UserFeedItem
                key={userProfile._id}
                profile={userProfile}/>
                ))
                
                //import user feeddetail component and pass in props
                return (
                
                <Wrapper>This Shit Is Working
                

                {feedProfiles}
                </Wrapper>
            
            )
        } else {
            return ( "")
        }
    }

}

export default UserFeed