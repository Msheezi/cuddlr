import styled from "styled-components"

export const Screen = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
`

export const ModalContainer = styled.div`
    /* width: 50%; */
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
    " . header header header ."
    " . mainImage . uploadbox ."
    " otherImages otherImages otherImages uploadbox .";
    /* " . header header ." */

    min-width: 500px;
    height: 75vh;
    min-height: 450px;
    padding: 10px;
    border-radius: 3px;
    margin: 50px 20%;
    
    background-color: #ffffff;
    box-sizing: border-box;
    /* border: 1px solid black; */
    /* overflow-y: auto; */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`

export const Headline = styled.h2`
    grid-area: header;
    text-align: center;
    margin-top: 5px;
`

// const ImagesContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
//     /* border: 1px solid black; */
//     margin: 50px 5px 50px 10px;
//     /* width: 30%; */
//     /* padding: 25px 10px; */
//     /* height: 90vh; */
//     align-items: center;

// `

export const SelectedImageContainer = styled.img`
    grid-area: mainImage;
    border: 1px solid blue;
    width: 300px;
    height: 300px;
    /* margin: 5px auto; */
    src: url(${props => props.url});
    object-fit: cover;

`

export const OtherImagesContainer = styled.div`
   grid-area: otherImages;
    display:flex;
    flex-direction: row;
    overflow-x: auto;
  
`

export const OtherImages = styled.img`
    border: 1px solid blue;
    margin: 50px auto;
    margin: 10px;
    max-height: 125px;
    max-width: 125px;
    src: url(${props => props.url});
    object-fit: cover;
    cursor: pointer;
    
`
export const UploadContainer = styled.div`
    grid-area: uploadbox;
    min-width: 300px;

    /* height: 75vh; */
    /* border: 1px solid red; */
    display:flex;
    flex-direction: column;
    align-items: center;
    /* margin: 50px; */

`

export const PhotoButtons = styled.button`
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
`

export const InputButton = styled.input`
    cursor: pointer;
    background-color:#0066FF;
    border: none;
    border-radius: 3px; 
    color: #fff;
    height: 30px;
`

export const Cancel = styled(PhotoButtons)`
    background-color: red;
    height: 20px;
    font-size: 10pt;
`
export const DeleteButton = styled(PhotoButtons)`
    height: 30px;
    font-size: 10pt;
    text-align: center;
    margin: 10px auto;
    
`