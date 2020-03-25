import axios from 'axios'

export const getProfiles = () =>{
    return axios.get('/users')
}

export const getProfile = (id) =>{
    return axios.get(`/users/${id}`)
}

export const getProfilePics = (id)=>{
    return axios.get(`/users/userPics/${id}`)
}