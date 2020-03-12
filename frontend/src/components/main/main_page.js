import React from 'react'
import styled from 'styled-components'



const MainPageContainer = styled.div`
    position: relative;
    /* min-height: 100vh; */

`


class MainPage extends React.Component {
    render() {
        return (
            <MainPageContainer>
                Find your cuddle buddy today
                
                {/* <Footer>
                    Copyright &copy; 2020 Cuddlr
                </Footer> */}
            </MainPageContainer>
        )
    }
}

export default MainPage