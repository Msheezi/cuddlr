import React from 'react'
import styled from 'styled-components'
import { getProfile, getProfilePics } from "../../util/profiles_util";
import Loader from "../spinner/spinner";

const Screen = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
`

const ModalContainer = styled.div`
    width: 50%;
    min-width: 500px;
    height: 90%;
    min-height: 450px;
    padding: 10px;
    border-radius: 3px;
    margin-left: 5%;
    margin-top: 40px;
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid black;
    overflow-y: auto;

`

const Headline = styled.h3`
    text-align: center;
    margin-top: 5px;
`

const ImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    /* border: 1px solid black; */
    margin: 50px 5px 50px 10px;
    width: 30%;
    padding: 25px 10px;
    /* height: 90%; */
   
`

const SelectedImageContainer = styled.img`
    border: 1px solid blue;
    width: 300px;
    height: 300px;
    margin: 15px auto;
    src: url(${props => props.url});
    object-fit: cover;

`

const OtherImagesContainer = styled.div`
    display:flex;
    flex-direction: row;
  
`

const OtherImages = styled.img`
    border: 1px solid blue;
    margin: 50px auto;
    margin: 10px;
    max-height: 125px;
    max-width: 125px;
    src: url(${props => props.url});
    object-fit: cover;
    cursor: pointer;
    
`


// pass in user photos as props?

export class PhotoManager extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            displayedImage: "",
            loaded:false,
            
        }

    }

    componentDidMount(){
        let id = this.props.currentUserId
        // sets the default image to the first image in the object array retrieved
        //backend needs to sort the images by the primary flag so this always works
        getProfilePics(id)
        .then(pics=> this.setState({
            images: pics.data, 
            loaded: true, 
            displayedImage: pics.data[0].pictureUrl 
        }))
    }

    handleClick(e){
        
        this.setState({ displayedImage: e.target.src })
    }

    render(){
        if (this.state.loaded){
        
        let others = this.state.images.map(imageObj => {
            let url = imageObj.pictureUrl
            return (
                    <OtherImages src={url} value={url} key={imageObj._id}
                     onClick={e=>this.handleClick(e)}></OtherImages>
                     )
        })
        let selected = <SelectedImageContainer src={this.state.displayedImage}></SelectedImageContainer>

        return(
            
                <ModalContainer>
                    <Headline>
                        Photo Manager
                    </Headline>
                    <ImagesContainer>
                        {selected}
                    <OtherImagesContainer>
                        {others}
                    </OtherImagesContainer>
                    </ImagesContainer>
                </ModalContainer>
            

             )
        } else {
            return  <Loader />;
        }
    }
}

export default PhotoManager