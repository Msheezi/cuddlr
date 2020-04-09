import React from 'react'
import styled from 'styled-components'

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

const SelectedImageContainer = styled.div`
    border: 1px solid blue;
    width: 300px;
    height: 300px;
    margin: 15px auto;
    background-image: url(${props => props.url});

`

const OtherImagesContainer = styled.div`
    display:flex;
    flex-direction: row;
    width: 100%;
    overflow-x: scroll;
    
    
`

const OtherImages = styled.div`
    border: 1px solid blue;
    margin: 50px auto;
    margin: 10px;
    min-height: 125px;
    min-width: 125px;
    background-image: url(${props => props.url});
    
`


// pass in user photos as props?

export class PhotoManager extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            selected: 0

        }


        
    }

    handleClick(idx){
        this.setState({ selected: idx })
    }

    render(){

        const splashPics = [
            "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/laura-margarita-cedeno-peralta-X1VHEbHR1LQ-unsplash.jpg",
            "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/shanique-wright-8eAtzCbtv7A-unsplash.jpg",
            "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/freestocks-t3mXTwuTWJ4-unsplash.jpg",
            "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/clem-onojeghuo-eOe81Ux2DUw-unsplash.jpg",
        ]

        let others = splashPics.map((url, i) => {
            return (<OtherImages url={url} key={i} onClick={i=> this.handleClick(i)}></OtherImages>)
        })
        let url = splashPics[this.state.selected]
        let selected = <SelectedImageContainer url={url}></SelectedImageContainer>

        return(
            <Screen>
                <ModalContainer>
                    <Headline>Photo Manager</Headline>
                    <ImagesContainer>
                    {selected}
                    {/* <SelectedImageContainer></SelectedImageContainer> */}
                    <OtherImagesContainer>
                        {others}
                        {/* <OtherImages></OtherImages>
                        <OtherImages></OtherImages>
                        <OtherImages></OtherImages>
                        <OtherImages></OtherImages> */}
                    </OtherImagesContainer>
                    
                    </ImagesContainer>
                </ModalContainer>
            </Screen>

        )
    }
}

export default PhotoManager