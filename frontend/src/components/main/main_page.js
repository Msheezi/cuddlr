import React from 'react'
import styled from 'styled-components'
import Carousel from '../profile/carousel'



const MainPageContainer = styled.div`
    position: relative;
    /* min-height: 100vh; */
    

`
const Accent = styled.span`
font-family: 'Luckiest Guy', cursive;
  color: #F4C3C2;
  text-shadow: 0 0 3px red;
`
const HeadlineH3 = styled.h3`
color: #2e3443;
font-size: 16pt;
margin: 30px auto;
text-align: center;
`

const Tagline = styled.h3`
    color: #2e3443;
    font-size: 12pt;
    margin: 30px auto;
    text-align: center; 
`

const mainPageStyle = {
    margin: "30px auto",
    width: "80vw",
    height: "60vh",

}
const splashPics = [
    "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/laura-margarita-cedeno-peralta-X1VHEbHR1LQ-unsplash.jpg",
    "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/shanique-wright-8eAtzCbtv7A-unsplash.jpg",
    "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/freestocks-t3mXTwuTWJ4-unsplash.jpg",
    "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/clem-onojeghuo-eOe81Ux2DUw-unsplash.jpg",
    "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/dario-valenzuela-bBxxlSTwM68-unsplash.jpg",
    "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/joao-silas-ve6UrhKh3nk-unsplash.jpg",
    "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/matthew-fassnacht-prN1G8dUMm8-unsplash.jpg",
    "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/thiago-barletta-36tX9ncYlzw-unsplash.jpg",
    "https://cuddlr-dev.s3-us-west-1.amazonaws.com/splash/thought-catalog-2k58cwVzMQI-unsplash.jpg"
]


const carouselOptions = {
    style: mainPageStyle,
    arrows: false, 
    auto: true,
    transitionDelay: "1s"
}

class MainPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentImageIndex: 0
        }


    }

    render() {
        return (
            <MainPageContainer>
                <HeadlineH3>Find your <Accent>cuddle</Accent> buddy today</HeadlineH3>
                <Tagline>Help us build a better, kinder human race through mutual embrace!</Tagline>
                {/* <Carousel imgUrls={splashPics} style={mainPageStyle} arrows={false} auto={true}/> */}
                <Carousel imgUrls={splashPics} options={carouselOptions}/>
                {/* <Footer>
                    Copyright &copy; 2020 Cuddlr
                </Footer> */}
            </MainPageContainer>
        )
    }
}

export default MainPage