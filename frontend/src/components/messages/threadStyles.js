import styled from 'styled-components'

export const ThreadContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
  `


export const MessageWindow = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 50vh;
    /* height: 80%; */
`
export const MessageBubble = styled.p`
    align-self: ${props=> props.alignment};
    margin: 4px;
    border-radius: 10px;
    padding: 5px;
    font-size: 12pt;
    min-width: 30px;
    text-align: center;
    max-width: 200px;
    word-wrap: break-word;
    /* border:1px solid black; */
    background-color: ${props=> props.color};
    /* have a prop that assigns alignment based on the prop value receivd */
`





