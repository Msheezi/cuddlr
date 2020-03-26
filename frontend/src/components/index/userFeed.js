import React from 'react'
import styled from 'styled-components'
import {getProfiles } from '../../util/profiles_util'
import {UserFeedItem} from './userFeedItem'


const Wrapper = styled.div`
width: 80vw;
display: flex;
/* justify-content:flex-start; */
flex-wrap: wrap;
align-self: center;
margin: 15px auto;
position: relative;
z-index: 1;
background-color: white;
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
                //add an onclick to wrapper to go to profile page
                return (
               <div>

                    <h3>View Cuddlrs In Your Area</h3>
               <Wrapper> 
                

                {feedProfiles}
                </Wrapper>
               </div>
            
            )
        } else {
            return ( <div>Page is Loading...</div>)
        }
    }

}

export default UserFeed