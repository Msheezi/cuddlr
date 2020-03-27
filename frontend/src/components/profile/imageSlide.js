import React from 'react'
import styled from 'styled-components'

const ArrowDiv = styled.div`
color: red;
cursor: pointer;
&:hover{
    color: blue;
}
`

export const ImageSlide = ({url}) => {
    const styles ={
        backgroundImage: `url(https://res.cloudinary.com/ddtykf72z/image/fetch/f_auto,q_auto/${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: "100%",
        width: "100%",
        boxShadow: "-2px 3px 3px 3px lightgray",
        transition: "backgroundImage 1s ease-in-out"


    }

    return (
        <div className="image-slide" style={styles}></div>
    )
}


export const Arrow = ({direction, clickFunction, glyph}) => (
    <ArrowDiv className={`slide-arrow ${direction}`} 
    onClick={clickFunction}>
        {glyph}
    </ArrowDiv>
)

