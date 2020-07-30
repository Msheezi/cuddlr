import * as ProfileAPI from '../util/profiles_util'


export const RECEIVE_USER_UPDATE = "RECEIVE_USER_UPDATE"
export const LIKE_USER = "LIKE_USER"
export const UNLIKE_USER = "UNLIKE_USER"
export const GET_LIKES_LIST = "GET_LIKES_LIST"

export const addLike = (user) => ({
    type: LIKE_USER,
    user
})
export const removeLike = (user) => ({
    type: UNLIKE_USER,
    user
})

export const getLikes =(user) => ({
    type: GET_LIKES_LIST,
    user
})

export const getLikesList = (userId) =>dispatch =>(
    ProfileAPI.getUserLikesList(userId).then(list=>dispatch(getLikes(list)))
)

export const likeUser = (userId, likedUser) => dispatch =>(
    ProfileAPI.likeUser(userId, likedUser).then(user => dispatch(addLike(user)))
)
export const unlikeUser = (userId, likedUser) => dispatch =>(
    ProfileAPI.unlikeUser(userId, likedUser).then(user => dispatch(removeLike(user)))
)

export const receiveUserUpdate = user => ({
    type: RECEIVE_USER_UPDATE,
    user
})

// export const updateUser = dispatch