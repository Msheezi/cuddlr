import styled from 'styled-components'

export const Screen = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index:2;

`

export const ModalContainer = styled.div`
  position: fixed;
  background: white;
  width: 400px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-items:center;
  align-items: center;
`

export const MessageBox = styled.textarea`
    margin: 5% auto;
    height: 50%;
    width:80%;

`
export const MessageButton = styled.button`
    width: 50px;
    background-color: #0066FF;
    color: #fff;
    border: none;
    border-radius: 5px; 
    align-self: center;
`