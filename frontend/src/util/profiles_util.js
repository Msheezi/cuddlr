import axios from 'axios'

export const getProfiles = () =>{
    return axios.get('/users')
}