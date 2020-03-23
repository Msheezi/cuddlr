import React from 'react'
import {Container, Body, Title, Text, Image, Button} from './indexstyles'

// const ProfileContainer = styled.div`
// display: flex;
// background-image: url(${props => props.pic});
// background-size:cover;
// width: 250px;
// height: 300px;
// border: 1px solid black;
// margin: 20px;
// position: relative;
// cursor: pointer;
//  &:hover {
//         transform: translateY(0)
//     }

// `

// const SingleTeam = styled.div`
    
   
   
  
// `

// const Box = styled.div`
// width: 350px;
// height: 200px;
// transition: 06s;
// `



// const BoxImg = styled.div`
 
//  `

// const BoxText = styled.div`

// `

// const Description = styled.div` 

// `

export  const UserFeedItem = ({props, profile}) => {
    let today = new Date
    let birthYear = profile.hasOwnProperty('dob') ? new Date(profile.dob): 0
    let userAge = birthYear != 0 ? today.getFullYear() - birthYear.getFullYear() : ""

    let imgSrc 
    if (profile.mainProfilePic){
        imgSrc = profile.mainProfilePic
    } else {
        imgSrc = 'https://cuddlr-dev.s3-us-west-1.amazonaws.com/noimage.jpg'
    }


    return (
        <Container pic={profile.mainProfilePic}>

                <Image src={imgSrc}/>
            <Body>
                
                <Title>{profile.username}</Title>
                    <Text>Age: {userAge}</Text>
                    <Text>{profile.headline}</Text>
                     <br/>
            </Body>
                     <Button>View Profile</Button>
          
        </Container>
         
        
    )
}




export default UserFeedItem



// single team 
// box img  /box img
// bot img txt 
// text area 
// h2 
// h3 
