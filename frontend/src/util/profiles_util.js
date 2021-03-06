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

export const updateProfile = (id, data) => {
    
    return axios.patch(`/users/${id}`, data)
}

export const uploadPhoto = (data) => {
    return axios.post('/userPicture/upload', data)
}

export const setPrimaryPic = (id, data) => {
    return axios.patch(`/users/makeprimary/${id}`, data)
}

export const deletePhoto = (id)=>{
    return axios.delete(`/userPicture/delete/${id}`)
}

export const likeUser = (userId, likedUser)=>{
    return axios.post(`/users/like/new?userId=${userId}&likedUser=${likedUser}`) 
}

export const unlikeUser = (userId, likedUser)=>{
    return axios.post(`/users/like/delete?userId=${userId}&likedUser=${likedUser}`)
}

export const getUserLikes = (userId)=> {
    return axios.get(`/users/like/users?userId=${userId}`)
}

export const getUserLikesList = (userId)=> {
    return axios.get(`users/currentUserLikes/${userId}`)
}