import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from "../types";

let user = localStorage.getItem("myToken");
const initialState = {
    authenticated: user ? true : false,
    username: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            };
        case SET_UNAUTHENTICATED:
            return {
                authenticated: false,
                username: null,
            };
        case SET_USER:
            return {
                ...state,
                username: action.payload,
            };
        default:
            return state;
    }
}
