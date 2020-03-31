import React from 'react'

import { getProfile, getProfilePics} from '../../util/profiles_util'
import Carousel from '../carousel/carousel'
import {getAge, } from '../../reducers/selectors'
import {ProfileContainer, ProfileDetailsContainer, ProfileDetails, ProfileDescripton, CrudButtons, ProfileText, ProfileButtons} from './profileStyles'


//carousel options for image component
const carouselOptions = {
    
    arrows: true,
    auto: false,
    transitionDelay: "0s"
    
}

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

                        {/* <Carousel imgUrls={imgUrls} arrows={true} auto={false}/> */}
                        <Carousel imgUrls={imgUrls} options={carouselOptions}/>
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