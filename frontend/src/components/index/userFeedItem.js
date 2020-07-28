import React from "react";
import { Container, Body, Title, Text, Image, Button } from "./indexstyles";
import { Link } from "react-router-dom";

export const UserFeedItem = ({ profile }) => {
  // let today = new Date()
  // let birthYear = profile.hasOwnProperty('dob') ? new Date(profile.dob): 0
  // let userAge = birthYear !== 0 ? today.getFullYear() - birthYear.getFullYear() : ""

  let imgSrc;
  if (profile.mainProfilePic) {
    imgSrc = profile.mainProfilePic;
  } else {
    imgSrc = "https://cuddlr-dev.s3-us-west-1.amazonaws.com/blankpic.webp";
  }

  return (
    <Link to={`/users/${profile._id}`} style={{ textDecoration: "none" }}>
   <Container pic={profile.mainProfilePic}>
      <Image src={imgSrc} />
      <Body>
        <Title>{profile.headline}</Title>
        {/* <Text>Age: {userAge}</Text> */}
        <Text>{profile.description}</Text>
        <br />
        {/* <BottomFade></BottomFade> */}
      </Body>
      
        <Button>{profile.username}</Button>
    </Container>
      </Link>
  );
};

export default UserFeedItem;

// { profile.username }
// single team
// box img  /box img
// bot img txt
// text area
// h2
// h3
