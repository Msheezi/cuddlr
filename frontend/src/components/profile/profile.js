import React from 'react'

import styled from 'styled-components'
import { getProfile, getProfilePics} from '../../util/profiles_util'
import Carousel from './carousel'
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

    render(){
    
        

        let profileData =  this.state.user
        
        if (this.state.loaded){
            let imgUrls = this.state.pics.map(imgObj => (
                 imgObj.pictureUrl
            ))

            return(
                <div>This Profile is working {profileData.username}
                    <Carousel imgUrls={imgUrls}/>
                </div>
                )
            } else {
                return (<div>Info Loading...</div>)
            }


    }
}

export default Profile