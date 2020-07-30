import { LIKE_USER, UNLIKE_USER, GET_LIKES_LIST} from '../actions/user_actions'


const LikesReducer = (state=[], action)=>{
    Object.freeze(state)
    let newState
    switch (action.type){
        case LIKE_USER:
            newState = [...state]
             newState.push(action.user.data)
             return newState
        case UNLIKE_USER:
            newState = [...state]
            let idx = newState.indexOf(action.user.data._id)
            newState.splice(idx,1)
            return newState
        case GET_LIKES_LIST:
            newState = action.user.data.likes
            return newState
        default:
           return state

    }
}


export default LikesReducer