import {updateProfile} from '../util/profiles_util'

export const RECEIVE_USER_UPDATE = "RECEIVE_USER_UPDATE"

export const receiveUserUpdate = user => ({
    type: RECEIVE_USER_UPDATE,
    user
})

export const updateUser = dispatch