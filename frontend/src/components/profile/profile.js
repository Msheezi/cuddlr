import React from "react";

import { getProfile, getProfilePics } from "../../util/profiles_util";
import Carousel from "../carousel/carousel";
import { getAge } from "../../reducers/selectors";
import Loader from "../spinner/spinner";
import {
  ProfileContainer,
  ProfileDetails,
  ProfileDescripton,
  CrudButtons,
  ProfileText,
  ProfileButtons,
  ProfileHeader,
  ProfileCarouselContainer,
  DetailsText,
  Likes,
  StyledHeadline,
  StyledDescription
} from "./profileStyles";
import { updateProfile } from "../../util/profiles_util";

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

  handleInput(e) {
    // function is written this way to access the nested user object in state
    // destructures user and assigns to variable currentState
    // destructures e.target to get the id of the field being input to update the currentState object
    // sets state with the new user object

    const { user } = { ...this.state };
    const currentState = user;
    const { id, value } = e.target;
    currentState[id] = value;
    this.setState({ user: currentState });
  }

  handleSubmit() {
    //creates object from state, and sends to route updating mongo
    const {headline, description, cuddleStyle, cuddlePosition} = this.state.user
    
    const updatedProfile = {
      headline: headline,
      description: description,
      cuddleStyle: cuddleStyle,
      cuddlePosition: cuddlePosition
    };

    
    
    updateProfile(this.props.match.params.id, updatedProfile);
    this.enable();
  }

  renderCruds() {
    // conditional render of crud buttons based on if the profile being used is
    // the current users profile

    if (this.props.currentUserId === this.props.match.params.id) {
      let text = this.state.disabled ? (
        <ProfileButtons onClick={() => this.enable()}>
          Update Profile
        </ProfileButtons>
      ) : (
        <ProfileButtons onClick={e => this.handleSubmit()}>
          Save Changes
        </ProfileButtons>
      );

      return (
        <CrudButtons>
          {text}
          {/* <ProfileButtons onClick={() => this.enable()}></ProfileButtons> */}
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

  // add an on change to update the user, DONE
  // include a toggle to prevent updating on users that you don't belong to DONE
  // add a backend validation that current user == userId being updated, if not send an error

  enable() {
    // enables the profile to be edited if the current userID matches the displayed userId

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
          {/* <button onClick={() => this.enable()}>Edit</button> */}

          <ProfileHeader>
            <StyledHeadline
              id="headline"
              onChange={e => this.handleInput(e)}
              disabled={this.state.disabled}
              value={this.state.user.headline || ""}
            />
          </ProfileHeader>

          <ProfileCarouselContainer>
            <Carousel imgUrls={imgUrls} options={carouselOptions} />
          </ProfileCarouselContainer>

          <ProfileDetails>
            <DetailsText>{profileData.username}'s Details</DetailsText>
            <ProfileText>Age: {getAge(profileData.dob)}</ProfileText>
            <ProfileText>City: {profileData.location}</ProfileText>
            <ProfileText> Cuddle Style: 
              {/* Cuddle Style: {profileData.cuddleStyle} */}
              <select disabled={this.state.disabled} id="cuddleStyle" defaultValue={this.state.user.cuddleStyle} onChange={e => this.handleInput(e)}>
                <option value="Spoon">Spoon</option>
              <option value="Loom">Loom</option>
              <option value="Boom">Boom</option>
              {/* <option value={this.state.user.cuddleStyle} selected>{this.state.user.cuddleStyle}</option> */}
              </select>
            </ProfileText>
            <ProfileText> Cuddle Position: 
              {/* Cuddle Style: {profileData.cuddleStyle} */}
              <select disabled={this.state.disabled} id="cuddlePosition" defaultValue={this.state.user.cuddlePosition} onChange={e => this.handleInput(e)}>
                <option value="Big Spoon">Big Spoon</option>
                <option value="Little Spoon">Little Spoon</option>
                <option value="There Is No Spoon">There Is No Spoon</option>
              {/* <option value={this.state.user.cuddleStyle} selected>{this.state.user.cuddleStyle}</option> */}
              </select>
            </ProfileText>

            
            <ProfileText>Gender: {profileData.gender}</ProfileText>
            <ProfileText>Interested in: {profileData.targetGender}</ProfileText>
          </ProfileDetails>

          <ProfileDescripton>
            <h2>About Me:</h2>
            <StyledDescription
              id="description"
              row
              onChange={e => this.handleInput(e)}
              disabled={this.state.disabled}
              // the below is a short circuit mechanism in case description comes in blank
              value={this.state.user.description || ""}
            />
          </ProfileDescripton>

          <Likes>
            <ProfileButtons color="red">
              Like {profileData.username}
            </ProfileButtons>
          </Likes>

          {this.renderCruds()}
        </ProfileContainer>
      );
    } else {
      // maybe replace this with some graphic?
      // return <div>Profile Loading...</div>;
      return <Loader />;
    }
  }
}

// export default Profile
