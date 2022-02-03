import axios from "axios";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from "../types";

export const loginUser = (token) => (dispatch) => {
    dispatch({
        type: SET_AUTHENTICATED,
    });
    setAuthorizationHeader(token);
};

export const setUser = (username) => (dispatch) => {
    dispatch({
        type: SET_USER,
        payload: username,
    });
};

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: SET_UNAUTHENTICATED,
    });
    localStorage.removeItem("myToken");
    delete axios.defaults.headers.common["Authorization"];
};

const setAuthorizationHeader = (token) => {
    const myToken = `Bearer ${token}`;
    localStorage.setItem("myToken", myToken);
    axios.defaults.headers.common["Authorization"] = myToken;
};
