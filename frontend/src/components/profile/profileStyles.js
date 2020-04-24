import styled from "styled-components";

// export const ProfileContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 80vw;
//     margin: 10px auto;

// `
export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    ". header header . "
    ". carousel details  ."
    ". likes spacer . "
    "  . description description . "
    "  crud crud crud crud ";
  width: 90vw;
  margin: 10px auto;
  background-color: transparent;
`;

export const ProfileHeader = styled.h2`
  grid-area: header;
  text-align: center;
  /* width: 100%; */
  font-size: 22pt;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
  font-weight: 300;
  /* margin: 10px; */
  /* box-sizing: border-box; */
  /* background-color: white; */
`;

export const ProfileCarouselContainer = styled.div`
  grid-area: carousel;
  margin: 0;
  justify-self: center;
  background-color: transparent;

  border-radius: 0.25rem;
  /* overflow:hidden; */

`;
export const Likes = styled.div`
  grid-area: likes;
  display: flex;
  margin: auto;
  border-bottom: 1px solid black;
  width: 100%;
`;
export const Spacer = styled.div`
  grid-area: spacer;
  border-bottom: 1px solid black;
  width: 100%;
`;

export const ProfileDetails = styled.div`
  grid-area: details;

  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  /* margin: 10px; */
  /* padding-top: 30px; */
  background-color: white;
  box-sizing: border-box;
  border-radius: 0.25rem;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const ProfileDescripton = styled.div`
  grid-area: description;

  box-sizing: border-box;
  border-radius: 0.25rem;

`;

export const CrudButtons = styled.div`
  grid-area: crud;
  display: flex;
  margin: 5px auto;
`;

export const ProfileText = styled.h3`
  margin: 5px;
  color: #2e3443;
  font-weight: 200;
  word-wrap: break-word;
`;

export const DetailsText = styled.h2`
  font-family: "Work Sans", sans-serif;
  font-weight: 200;
  margin: 5px;
  color: #2e3443;
  word-wrap: break-word;
`;

export const ProfileButtons = styled.button`
  cursor: pointer;
  margin: 10px;
  /* width: 50%; */
  height: 40px;
  /* margin: 10px auto; */
  color: white;
  background-color: ${(props) => props.color || "#0066FF"};
  /* background-color: #28a745; */
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
    background-color: ${props => props.hover || "#218838"};
    border-color: #1e7e34;
  }
`;

export const LikeButton = styled(ProfileButtons)`
  width: 50%;
  margin: 10px auto;
`;

export const StyledInput = styled.input`
  &:disabled {
    border: none;
    background-color: white;
  }
`;

export const StyledTextArea = styled.textarea`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 0.25rem;
  font-family: "Work Sans", sans-serif;
  resize: none;
  &:disabled {
    border: none;
    background-color: white;
  }
`;

export const StyledHeadline = styled(StyledInput)`
  font-family: "Work Sans", sans-serif;
  width: 100%;
  font-size: 24pt;
  text-align: center;
  border-radius: 5px;

`;

export const StyledDescription = styled(StyledTextArea)`
  font-size: 14pt;
  color: #2e3443;
  word-wrap: break-word;
  width: 100%;
  height: 200px;
`;
export const StyledSelect = styled.select`
  font-size: 14pt;
  color: #2e3443;
  border: none;
  background-color: lightblue;

  &:disabled {
    border: none;
    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`;

export const AboutMe = styled.h3`
  background-color: white;
  padding: 5px;
  border-radius: 0.25em;
  font-weight: 200;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
