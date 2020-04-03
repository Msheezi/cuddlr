import React from "react";
import styled from "styled-components";
import { getProfile, getProfilePics } from "../../util/profiles_util";
import Carousel from "../carousel/carousel";
import { getAge } from "../../reducers/selectors";
import {
  ProfileContainer,
  ProfileDetailsContainer,
  ProfileDetails,
  ProfileDescripton,
  CrudButtons,
  ProfileText,
  ProfileButtons,
  ProfileHeader,
  ProfileCarouselContainer,
  DetailsText,
  Likes
} from "./profileStyles";

const StyledInput = styled.input`
  font: 18.72px "Times New Roman";
  color: #2e3443;

  &:disabled {
    border: none;
    background-color: transparent;
  }
`;

//carousel options for image component
const carouselOptions = {
  arrows: true,
  auto: false,
  transitionDelay: "0s"
};

//
export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      disabled: true
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    getProfile(id)
      .then(profile => this.setState({ user: profile.data[0] }))
      .then(() => getProfilePics(id))
      .then(pics => this.setState({ pics: pics.data, loaded: true }));
    //fetch profile, fetch pictures from profile using id
  }

  componentDidUpdate(prevProps) {
    // added component did update to resolve bug where nav bar "My Profile" button, when already
    // on a profile was not triggering a re-render with the new data
    let id = this.props.match.params.id;

    if (prevProps.match.params.id !== id) {
      getProfile(id)
        .then(profile => this.setState({ user: profile.data[0] }))
        .then(() => getProfilePics(id))
        .then(pics => this.setState({ pics: pics.data, loaded: true }));
    }
  }

  renderCruds() {
    if (this.props.currentUserId === this.props.match.params.id) {
      return (
        <CrudButtons>
          <ProfileButtons>Update Profile</ProfileButtons>
          <ProfileButtons>Manage Photos</ProfileButtons>
        </CrudButtons>
      );
    } else {
      return (
        <CrudButtons>
          <ProfileButtons>
            {`Contact ${this.state.user.username} `}
          </ProfileButtons>
        </CrudButtons>
      );
    }
  }

  // add an on change to update the user,
  // include a toggle to prevent updating on users that you don't belong to
  // add a backend validation that current user == userId being updated, if not send an error

  enable() {
    if (this.props.match.params.id === this.props.currentUserId) {
      let toggle = !this.state.disabled;

      return this.setState({ disabled: toggle });
    }
  }

  render() {
    let profileData = this.state.user;

    if (this.state.loaded) {
      let imgUrls =
        this.state.pics.length === 0
          ? ["https://cuddlr-dev.s3-us-west-1.amazonaws.com/blankpic.webp"]
          : this.state.pics.map(imgObj => imgObj.pictureUrl);

      return (
        <ProfileContainer>
          <ProfileHeader>
            {profileData.headline}
          </ProfileHeader>
    
          <ProfileCarouselContainer>
            <Carousel imgUrls={imgUrls} options={carouselOptions} />
          </ProfileCarouselContainer>


          <ProfileDetails>
            {/* <fieldset disabled={this.state.disabled} onClick={() => this.enable()}> */}

            {/* <form > */}
            <DetailsText>{profileData.username}'s Details</DetailsText>
            <ProfileText>Age: {getAge(profileData.dob)}</ProfileText>
            {/* <ProfileText >Age: <StyledInput value={getAge(profileData.dob)} /></ProfileText> */}
            <ProfileText>Location: {profileData.location}</ProfileText>
            <ProfileText>Cuddle Style: {profileData.cuddleStyle}</ProfileText>
            <ProfileText>
              Cuddle Position: {profileData.cuddlePosition}
            </ProfileText>
            <ProfileText>Gender: {profileData.gender}</ProfileText>
            <ProfileText>
              Interested in: {profileData.targetGender}
            </ProfileText>

            {/* </form> */}
          </ProfileDetails>
          
          <ProfileDescripton>
            <h2>About Me:</h2>
            <ProfileText>{profileData.description}</ProfileText>
          </ProfileDescripton>
          {/* </fieldset> */}

        <Likes>
          <ProfileButtons color="red">Like {profileData.username}</ProfileButtons>
        </Likes>

          {this.renderCruds()}
          
        </ProfileContainer>
      );
    } else {
      // maybe replace this with some graphic?
      return <div>Profile Loading...</div>;
    }
  }
}

// export default Profile
