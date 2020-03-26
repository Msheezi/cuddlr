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
        if (this.props.auto){
            this.autoAdvance()
        }
        this.setState({ imgUrls: this.props.imgUrls})
    }

    componentWillMount() {
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

    renderArrows() {
        if (this.props.arrows){
            return (
                <>
                    <Arrow direction="left"
                        clickFunction={this.previousSlide}
                        glyph="&#9664;" />

                    <ImageSlide url={this.props.imgUrls[this.state.currentImageIndex]} />

                    <Arrow direction="right"
                            clickFunction={this.nextSlide}
                            glyph="&#9654;" />
                </>
                    )
        } else {
            return (
                  <ImageSlide url={this.props.imgUrls[this.state.currentImageIndex]} />
                   )
                }
    }

    render(){
       
        const CarouselContainer = this.props.style || {
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


 //     <Arrow direction="left"
            //         clickFunction={this.previousSlide}
            //         glyph="&#9664;"/>

            //     <ImageSlide url={this.props.imgUrls[this.state.currentImageIndex]}/>

            //     <Arrow direction="right"
            //         clickFunction={this.nextSlide}
            //         glyph="&#9654;" />