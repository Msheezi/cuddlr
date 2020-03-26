import React from 'react'
import {ImageSlide, Arrow} from './imageSlide'
import styled from  'styled-components'

const CarouselContainer= styled.div`
height: 300px;
width: 300px;
display: flex;
align-items: center;
`

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
        this.setState({ imgUrls: this.props.imgUrls})
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

    render(){
       
        
        return (
            <CarouselContainer>
                <Arrow direction="left"
                    clickFunction={this.previousSlide}
                    glyph="&#9664"/>

                <ImageSlide url={this.props.imgUrls[this.state.currentImageIndex]}/>

                <Arrow direction="right"
                    clickFunction={this.nextSlide}
                    glyph="&#9654" />
            </CarouselContainer>
        )

    }
}

export default Carousel