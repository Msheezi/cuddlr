import React from 'react'
import {ImageSlide, Arrow} from './imageSlide'
import styled from  'styled-components'


// const CarouselContainer = styled.div`
// height: 300px;
// width: 300px;
// display: flex;
// align-items: center;
// margin: 15px 20px 10px 0px;
// padding-top: 50px;
// `




//This componenet is expecting an options has when called that can constist of 
// {
// style: "styles for the carousels container" , 
// arrows: do you want to show arrows to progess images,
// auto: should this use the auto advance feature ,
// transitionDelay: was is the delay in executing the slide transition
// }


class Carousel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentImageIndex: 0,
           
        }

        this.previousSlide = this.previousSlide.bind(this)
        this.nextSlide = this.nextSlide.bind(this)

    }

    componentDidMount(){
        if (this.props.options.auto){
            this.autoAdvance()
        }
        this.setState({ imgUrls: this.props.imgUrls})
    }

    componentWillUnmount() {
        clearInterval(this.carouselInterval)
    }

    autoAdvance() {
        this.carouselInterval = setInterval(() => {
            this.nextSlide()
        }, 10000)

    }


    previousSlide() {
        let imgUrls = this.props.imgUrls
        const lastIndex = imgUrls.length - 1
        const {currentImageIndex} = this.state
        const shouldResetIndex = currentImageIndex === 0
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1
        this.setState({
            currentImageIndex: index
        })
    }

    nextSlide() {
        let imgUrls = this.props.imgUrls
        const lastIndex = imgUrls.length - 1
        const { currentImageIndex } = this.state
        const shouldResetIndex = currentImageIndex === lastIndex
        const index = shouldResetIndex ? 0 : currentImageIndex + 1
        this.setState({
            currentImageIndex: index
        }) 
    }

    // if arrows are being rendered, there is no fade transition for the carousel 
    // thus I'm not passing the transition delay option into the component
    renderArrows() {
        if (this.props.options.arrows){
            return (
                <>
                    <Arrow direction="left"
                        clickFunction={this.previousSlide}
                        glyph="&#9664;" />

                    <ImageSlide url={this.props.imgUrls[this.state.currentImageIndex]}  />

                    <Arrow direction="right"
                            clickFunction={this.nextSlide}
                            glyph="&#9654;" />
                </>
                    )
        } else {
            //This is for the auto slide function, the delay is for a smooth fade in/out transition
            return (
                <ImageSlide url={this.props.imgUrls[this.state.currentImageIndex]} transitionDelay={this.props.options.transitionDelay}  />
                   )
                }
    }

    render(){
       
        const CarouselContainer = this.props.options.style || {
            height: "300px",
            width: "300px",
            display: "flex",
            alignItems: "center",
            margin: "15px 20px 10px 0px",
            paddingTop: "50px ",
        }
        
        return (
            <div style={CarouselContainer}>
           
            {this.renderArrows()}
            </div>
        )

    }
}

export default Carousel


 