import React from 'react'

import styled from 'styled-components'
import { getProfile, getProfilePics} from '../../util/profiles_util'
import Carousel from './carousel'
import {getAge, refreshProfile} from '../../reducers/selectors'



const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin: 10px auto;

`
const ProfileDetailsContainer = styled.div`
    display: flex;
`

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 100vh; */
    margin: 10px ;
    padding-top: 30px;

`
const ProfileDescripton = styled.div`
    width: 80vw;
    margin: 10px auto;
`

const CrudButtons = styled.div`
    display: flex;
    margin: 5px auto;

`

const ProfileText = styled.h3`
    margin: 5px;
    color: #2e3443;

`
const ProfileButtons = styled.button`
cursor: pointer;
margin: 10px;
width: 100%;
height: 40px;
color: #fff;
background-color: #28a745;
border-color: #28a745;
display: block;
font-weight: bold;
text-align: center;
/* vertical-align: center; */
user-select: none;
border: 1px solid transparent;
/* padding: 0.375rem 0.75rem; */
font-size: 12pt;
/* line-height: 1.5; */
border-radius: 0.25rem;
box-sizing: border-box;
transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
}
`

//
class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id

        
        getProfile(id)
        .then(profile=> this.setState({user: profile.data[0]}))
        .then(() => getProfilePics(id))
        .then(pics=> this.setState({pics: pics.data, loaded: true}, ))
        //fetch profile, fetch pictures from profile using id
    }

    
    componentDidUpdate(prevProps){
        // added component did update to resolve bug where nav bar "My Profile" button, when already
        // on a profile was not triggering a re-render with the new data
        let id = this.props.match.params.id
  
        if (prevProps.match.params.id !== id){
            
            getProfile(id)
                .then(profile => this.setState({ user: profile.data[0] }))
                .then(() => getProfilePics(id))
                .then(pics => this.setState({ pics: pics.data, loaded: true }))
        }
    }

    render(){
    
        

        let profileData =  this.state.user
        
        if (this.state.loaded){
            
            let imgUrls = this.state.pics.length === 0 ? ["https://cuddlr-dev.s3-us-west-1.amazonaws.com/blankpic.webp"] : this.state.pics.map(imgObj => (
                 imgObj.pictureUrl
            ))

            

            return(
                <ProfileContainer>
                    <ProfileDetailsContainer>

                        <Carousel imgUrls={imgUrls} arrows={true} auto={false}/>
                        <ProfileDetails>
                            <h2>{profileData.headline}</h2>
                            <ProfileText>Age: {getAge(profileData.dob)}</ProfileText>
                            <ProfileText>Location: {profileData.location}</ProfileText>
                            <ProfileText>Cuddle Style: {profileData.cuddleStyle}</ProfileText>
                            <ProfileText>Cuddle Position: {profileData.cuddlePosition}</ProfileText>
                            <ProfileText>Gender: {profileData.gender}</ProfileText>
                            <ProfileText>Interested in: {profileData.targetGender}</ProfileText>
                            
                            
                        </ProfileDetails>
                    </ProfileDetailsContainer>
                    
                    <ProfileDescripton>
                        <h2>About Me:</h2>
                        <ProfileText>{profileData.description}</ProfileText>
                    </ProfileDescripton>
                    <CrudButtons>
                        <ProfileButtons>Update Profile</ProfileButtons>
                        <ProfileButtons>Manage Photos</ProfileButtons>

                    </CrudButtons>

                </ProfileContainer>
                )
            } else {
                // maybe replace this with some graphic?
                return (<div>Profile Loading...</div>)
            }


    }
}

export default Profile