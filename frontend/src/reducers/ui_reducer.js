import {
    OPEN_MESSAGE_MODAL,
    CLOSE_MESSAGE_MODAL
} from "../actions/ui_actions";
import { merge } from "lodash";

const preLoadedState = {
    messageModalOpen: false,
    
};

const uiReducer = (state = preLoadedState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case OPEN_MESSAGE_MODAL:
            return merge({}, state, { messageModalOpen: true });
        case CLOSE_MESSAGE_MODAL:
            return merge({}, state, { messageModalOpen: false });
        default:
            return state;
    }
};

export default uiReducer;
