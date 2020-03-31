import styled from 'styled-components'

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin: 10px auto;

`
export const ProfileDetailsContainer = styled.div`
    display: flex;
`

export const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 100vh; */
    margin: 10px ;
    padding-top: 30px;

`
export const ProfileDescripton = styled.div`
    width: 80vw;
    margin: 10px auto;
`

export const CrudButtons = styled.div`
    display: flex;
    margin: 5px auto;

`

export const ProfileText = styled.h3`
    margin: 5px;
    color: #2e3443;

`
export const ProfileButtons = styled.button`
cursor: pointer;
margin: 10px;
width: 100%;
height: 40px;
color: #fff;
background-color: #28a745;
border-color: #28a745;
display: block;
font-weight: bold;
text-align: center;
/* vertical-align: center; */
user-select: none;
border: 1px solid transparent;
/* padding: 0.375rem 0.75rem; */
font-size: 12pt;
/* line-height: 1.5; */
border-radius: 0.25rem;
box-sizing: border-box;
transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
}
`