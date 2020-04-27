import React from "react";

import { getProfile, getProfilePics, likeUser } from "../../util/profiles_util";
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
  StyledDescription,
  StyledSelect,
  Spacer,
  LikeButton,
  AboutMe,
} from "./profileStyles";
import { updateProfile } from "../../util/profiles_util";

//carousel options for image component
const carouselOptions = {
  arrows: true,
  auto: false,
  transitionDelay: "0s",
};

//
export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      disabled: true,
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;

    let profile = await getProfile(id);
    let pics = await getProfilePics(id);

    this.setState({
      user: profile.data[0],
      pics: pics.data,
      loaded: true,
    });

    // getProfile(id)
    //   .then((profile) => this.setState({ user: profile.data[0] }))
    //   .then(() => getProfilePics(id))
    //   .then((pics) => this.setState({ pics: pics.data, loaded: true }));
  }

  async componentDidUpdate(prevProps) {
    // added component did update to resolve bug where nav bar "My Profile" button, when already
    // on a profile was not triggering a re-render with the new data
    let id = this.props.match.params.id;
    if (prevProps.match.params.id !== id) {
      let profile = await getProfile(id);
      let pics = await getProfilePics(id);

      this.setState({
        user: profile.data[0],
        pics: pics.data,
        loaded: true,
      });
    }

    // if (prevProps.match.params.id !== id) {
    //   getProfile(id)
    //     .then((profile) => this.setState({ user: profile.data[0] }))
    //     .then(() => getProfilePics(id))
    //     .then((pics) => this.setState({ pics: pics.data, loaded: true }));
    // }
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
    const {
      headline,
      description,
      cuddleStyle,
      cuddlePosition,
      targetGender,
      location,
    } = this.state.user;

    const updatedProfile = {
      headline: headline,
      description: description,
      cuddleStyle: cuddleStyle,
      cuddlePosition: cuddlePosition,
      targetGender: targetGender,
      location: location,
    };

    updateProfile(this.props.match.params.id, updatedProfile);
    this.enable();
  }

  handleLike(e) {
    let userId = this.props.currentUserId;
    let likee = this.props.match.params.id;
    let obj = { userId: userId, likedUserId: likee };
    likeUser(obj);
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
        <ProfileButtons onClick={(e) => this.handleSubmit()}>
          Save Changes
        </ProfileButtons>
      );

      return (
        <CrudButtons>
          {text}
          <ProfileButtons onClick={() => this.props.history.push("/photoman")}>
            Manage Photos
          </ProfileButtons>
        </CrudButtons>
      );
    } else {
      return (
        <CrudButtons>
          <ProfileButtons onClick={this.props.openModal}>
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
      //imgUrls, this is array of images provided to carousel component
      // if no pics are retrived in DidMount, display blank pic
      // if pics are retrieved, filter the results to remove the main pic
      // Add the main pic to the front of imgUrls and pass to Carousel
      let imgUrls =
        this.state.pics.length === 0
          ? ["https://cuddlr-dev.s3-us-west-1.amazonaws.com/blankpic.webp"]
          : this.state.pics
              .filter((imgObj) => {
                return imgObj.pictureUrl !== profileData.mainProfilePic;
              })
              .map((objs) => objs.pictureUrl);

      imgUrls.unshift(profileData.mainProfilePic);

      return (
        <ProfileContainer>
          <ProfileHeader>
            <StyledHeadline
              id="headline"
              onChange={(e) => this.handleInput(e)}
              disabled={this.state.disabled}
              value={this.state.user.headline || ""}
            />
          </ProfileHeader>

          <ProfileCarouselContainer>
            <Carousel imgUrls={imgUrls} options={carouselOptions} />
          </ProfileCarouselContainer>

          <ProfileDetails>
            <DetailsText>{profileData.username}'s details</DetailsText>
            <ProfileText>Age: {getAge(profileData.dob)}</ProfileText>
            <ProfileText>City: {profileData.location}</ProfileText>
            <ProfileText>
              {" "}
              {"Cuddle Style: "}
              <StyledSelect
                disabled={this.state.disabled}
                id="cuddleStyle"
                defaultValue={this.state.user.cuddleStyle}
                onChange={(e) => this.handleInput(e)}
              >
                <option value="Spoon">Spoon</option>
                <option value="halfSpoon">Half Spoon</option>
                <option value="legHug"> Leg Hug</option>
              </StyledSelect>
            </ProfileText>
            <ProfileText>
              {" "}
              {"Cuddle Position: "}
              <StyledSelect
                disabled={this.state.disabled}
                id="cuddlePosition"
                defaultValue={this.state.user.cuddlePosition}
                onChange={(e) => this.handleInput(e)}
              >
                <option value="Big Spoon">Big Spoon</option>
                <option value="Little Spoon">Little Spoon</option>
                <option value="There Is No Spoon">Whatever Feels Right</option>
              </StyledSelect>
            </ProfileText>

            <ProfileText>
              {"Interested in: "}
              <StyledSelect
                disabled={this.state.disabled}
                id="targetGender"
                defaultValue={this.state.user.targetGender}
                onChange={(e) => this.handleInput(e)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Doesn't Matter">Doesn't Matter</option>
              </StyledSelect>
            </ProfileText>
            <ProfileText> Gender: {profileData.gender}</ProfileText>
          </ProfileDetails>

          <ProfileDescripton>
            <AboutMe>In My Own Words:</AboutMe>
            <StyledDescription
              id="description"
              row
              onChange={(e) => this.handleInput(e)}
              disabled={this.state.disabled}
              // the below is a short circuit mechanism in case description comes in blank
              value={this.state.user.description || ""}
            />
          </ProfileDescripton>

          <Likes>
            <LikeButton
              onClick={(e) => this.handleLike(e)}
              color="#DC7F6C"
              hover="#C44536"
            >
              Like {profileData.username}
            </LikeButton>
          </Likes>
          <Spacer />
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
