import {updateProfile} from '../util/profiles_util'

export const RECEIVE_USER_UPDATE = "RECEIVE_USER_UPDATE"
export const LIKE_USER = "LIKE_USER"
export const UNLIKE_USER = "UNLIKE_USER"

export const addLike = () => ({
    type: LIKE_USER
})
export const removeLike = () => ({
    type: UNLIKE_USER
})

export const receiveUserUpdate = user => ({
    type: RECEIVE_USER_UPDATE,
    user
})

export const updateUser = dispatch