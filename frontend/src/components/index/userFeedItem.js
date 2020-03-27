import React from 'react'
import {Container, Body, Title, Text, Image, Button} from './indexstyles'
import {Link} from 'react-router-dom'
import styled from 'styled-components'


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


// const BottomFade = styled.div`
// position:fixed;
// bottom: 250;
// height: 20px;
// width: 100%;
// /* z-index: 99; */
// background: url("%PUBLIC_URL%/bottom-fade.png");
// `

export  const UserFeedItem = ({props, profile}) => {
    let today = new Date()
    let birthYear = profile.hasOwnProperty('dob') ? new Date(profile.dob): 0
    let userAge = birthYear !== 0 ? today.getFullYear() - birthYear.getFullYear() : ""

    let imgSrc 
    if (profile.mainProfilePic){
        imgSrc = profile.mainProfilePic
    } else {
        imgSrc = 'https://cuddlr-dev.s3-us-west-1.amazonaws.com/blankpic.webp'
    }


    return (
        <Container pic={profile.mainProfilePic}>

                <Image src={imgSrc}/>
            <Body>
                
                <Title>{profile.headline}</Title>
                    {/* <Text>Age: {userAge}</Text> */}
                    <Text>{profile.description}</Text>
                     <br/>
                     {/* <BottomFade></BottomFade> */}
            </Body>
            <Link to={`/users/${profile._id}`} style={{ textDecoration: "none" }}><Button>{profile.username}'s Profile</Button></Link>
          
        </Container>
         
        
    )
}




export default UserFeedItem


// { profile.username }
// single team 
// box img  /box img
// bot img txt 
// text area 
// h2 
// h3 
