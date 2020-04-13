import React from 'react'
import styled from 'styled-components'
import { getProfile, getProfilePics, uploadPhoto } from "../../util/profiles_util";
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
    /* width: 50%; */
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
    display: flex;

`

const Headline = styled.h2`
    text-align: center;
    margin-top: 5px;
`

const ImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    /* border: 1px solid black; */
    margin: 50px 5px 50px 10px;
    /* width: 30%; */
    /* padding: 25px 10px; */
    /* height: 90vh; */
    align-items: center;
   
`

const SelectedImageContainer = styled.img`
    border: 1px solid blue;
    width: 300px;
    height: 300px;
    /* margin: 5px auto; */
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
const UploadContainer = styled.div`
    min-width: 300px;

    /* height: 75vh; */
    /* border: 1px solid red; */
    display:flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;

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

    // componentDidUpdate(prevProps) {
    //     // added component did update to resolve bug where nav bar "My Profile" button, when already
    //     // on a profile was not triggering a re-render with the new data
    //     let id = this.props.currentUserId

    //     if (prevProps.match.params.id !== id) {
    //         getProfile(id)
    //             .then((profile) => this.setState({ user: profile.data[0] }))
    //             .then(() => getProfilePics(id))
    //             .then((pics) => this.setState({ pics: pics.data, loaded: true }));
    //     }
    // }

    // add in a component did update to get the new pictures

    handleClick(e){
        
        this.setState({ displayedImage: e.target.src })
    }

    handleFile(e) {
        // const file = e.currentTarget.files[0];
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ photoFile: file, photoUrl: fileReader.result });
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }

    handleSubmit(e){

        e.preventDefault()
        let id = this.props.currentUserId
        const formData = new FormData()
        formData.append('file', this.state.photoFile, this.state.photoFile.name )
        formData.append("userId", id)
        formData.append("profilePrimary", "true")
        uploadPhoto(formData).then(()=> getProfilePics(id)
            .then(pics => this.setState({
                images: pics.data,
                loaded: true,
                displayedImage: pics.data[0].pictureUrl
            })))

    }
    

    render(){
        if (this.state.loaded){
            const preview = this.state.photoUrl ? (
                <img 
                style={{width:"250px", height:"250px", objectFit: "cover"}} 
                src={this.state.photoUrl} />
                    ) : null;
        let others = this.state.images.map(imageObj => {
            let url = imageObj.pictureUrl
            return (
                    <OtherImages src={url} value={url} key={imageObj._id}
                     onClick={e=>this.handleClick(e)}></OtherImages>
                     )
        })
        let selected = <SelectedImageContainer src={this.state.displayedImage}></SelectedImageContainer>

        return(
            <div>
                    <Headline>
                        Photo Manager
                    </Headline>

                <ModalContainer>
                    <ImagesContainer>
                            {selected}
                        <OtherImagesContainer>
                            {others}
                    </OtherImagesContainer>
                    </ImagesContainer>
                <UploadContainer> 
                    <h2>Upload A New Image</h2>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input type="file" name='file' id="file" onChange={(e)=> this.handleFile(e)}/>
                {preview}
                <label>Make Primary?</label>

                    {/* this is where you will put your image preview */}
                <input type="checkbox" value="Make Primary"/>
                <br/>
                <button type="submit" style={{justifySelf: "flex-end"}} >Save Changes</button>
               </form>
                </UploadContainer>
                </ModalContainer>
            </div>
            

             )
        } else {
            return  <Loader />;
        }
    }
}

export default PhotoManager