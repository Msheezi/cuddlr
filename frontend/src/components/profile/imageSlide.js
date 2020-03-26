import React from 'react'

export const ImageSlide = ({url}) => {
    const styles ={
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: "100%",
        width: "100%"

    }

    return (
        <div className="image-slide" style={styles}></div>
    )
}


export const Arrow = ({direction, clickFunction, glyph}) => (
    <div className={`slide-arrow ${direction}`}
    onClick={clickFunction}>
        {glyph}
    </div>
)

