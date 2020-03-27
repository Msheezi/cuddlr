import {getProfile, getProfilePics} from '../util/profiles_util'

export const getAge = (dob) => {
    let today = new Date()
    let birthday = new Date(dob)
    let age = today.getFullYear() - birthday.getFullYear()
    return age
}

export const refreshProfile = (id) => {
    getProfile(id)
        .then(profile => this.setState({ user: profile.data[0] }))
        .then(() => getProfilePics(id))
        .then(pics => this.setState({ pics: pics.data, loaded: true }))
}