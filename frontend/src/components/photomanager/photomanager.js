import React from 'react'
import { getProfile, getProfilePics, uploadPhoto } from "../../util/profiles_util";
import Loader from "../spinner/spinner";
import { 
        ModalContainer, 
        Headline, 
        SelectedImageContainer, 
        OtherImagesContainer, 
        OtherImages,
        UploadContainer,
} from './photomanstyles'

// pass in user photos as props?

export class PhotoManager extends React.Component{
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            selected: 0,
            displayedImage: "",
            loaded:false,
            checked: false,
            
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

    handleChange(e){
        this.setState({checked:!this.state.checked})
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
        formData.append("profilePrimary", this.state.checked)
        uploadPhoto(formData).then(()=> getProfilePics(id)
            .then(pics => this.setState({
                images: pics.data,
                loaded: true,
                displayedImage: pics.data[0].pictureUrl
            })))

    }

    clearImage(e){
        this.setState({photoFile: "", photoUrl: ""})
    }

    buttons(){
        if (this.state.photoFile){
            return (
                <>
                <div type="submit" style={{ justifySelf: "flex-end" }} onClick={e=> this.clearImage(e)} >Cancel</div>
                <button type="submit" style={{ justifySelf: "flex-end" }} >Save Changes</button>
                </>
            )
        } else {
            return ( 
                <> 
                <button type="submit" style={{ justifySelf: "flex-end" }} >Save Changes</button>
                </>
            )
        }
    }

    // hides the default select file input, uses a ref to grab the reference
    // set in the constructor.  placing the ref on the dom node allows me to use
    // in the function below and click the button via my other button
    simulateClick(e){
        this.myRef.current.click()
    }
    
    render(){
        if (this.state.loaded){
            // render the main image preview
            const preview = this.state.photoUrl ? (
               <div>

               <img 
                style={{
                    width:"250px", 
                    height:"250px",
                    objectFit: "cover"}} 
                src={this.state.photoUrl} />
                </div> 
                    ) : null;
                    // render other images if available 
        let others = this.state.images.map(imageObj => {
            let url = imageObj.pictureUrl
            return  (
                        <OtherImages 
                            key={imageObj._id}
                            src={url} 
                            value={url} 
                            onClick={e=>this.handleClick(e)}></OtherImages>
                     )
        })
        
        let selected = <SelectedImageContainer src={this.state.displayedImage}></SelectedImageContainer>

        return(
            <ModalContainer>
                    <Headline>
                        Photo Manager
                    </Headline>
                        {selected}
                    <OtherImagesContainer>
                        {others}
                    </OtherImagesContainer>
                
                <UploadContainer> 
                    <h3>Upload A New Image</h3>
                        <form style={{
                                    display: "flex", 
                                    flexDirection:"column", 
                                    alignItems: "Center"
                                    }}
                                onSubmit={(e)=>this.handleSubmit(e)}>
                            <input 
                                type="file" 
                                name='file'
                                id="file" 
                                style={{display:"none"}}
                                onChange={(e)=> this.handleFile(e)}
                                ref={this.myRef}
                            />
                                {preview}
                            <input type="button" 
                                value="Select Image" 
                                onClick={(e)=> this.simulateClick(e)}
                                 
                            />
                            <label>Make Primary?
                                <input 
                                    type="checkbox" 
                                    value="Make Primary"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </label>
                            <br/>
                            {this.buttons()}
                            {/* <button type="submit" style={{justifySelf: "flex-end"}} >Save Changes</button> */}
                        </form>
                </UploadContainer>
            </ModalContainer>
          
            

             )
        } else {
            return  <Loader />;
        }
    }
}

export default PhotoManager