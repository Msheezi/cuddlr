import React from 'react'
import styled from 'styled-components'

const ProfileContainer = styled.div`
display: flex;
background-image: url(${props => props.pic});
background-size:cover;
width: 250px;
height: 300px;
border: 1px solid black;
margin: 20px;
position: relative;
cursor: pointer;
 &:hover {
        transform: translateY(0)
    }

`

const SingleTeam = styled.div`
    
   
   
  
`

const Box = styled.div`
width: 350px;
height: 200px;
transition: 06s;
`



const BoxImg = styled.div`
 
 `

const BoxText = styled.div`

`

const Description = styled.div` 

`

export  const UserFeedItem = ({props, profile}) => {
    let imgSrc 
    if (profile.mainProfilePic){
        imgSrc = profile.mainProfilePic
    } else {
        imgSrc = ''
    }

    return (
        <ProfileContainer pic={profile.mainProfilePic}>

        <SingleTeam >
            <BoxImg></BoxImg>
            <BoxText>
                
                {profile.username}
                <br/>
                {profile.age}
            </BoxText>

        </SingleTeam>
        </ProfileContainer>
        
        
    )
}




export default UserFeedItem



// single team 
// box img  /box img
// bot img txt 
// text area 
// h2 
// h3 
