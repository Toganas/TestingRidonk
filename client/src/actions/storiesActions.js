import { FETCH_STORIES, CREATE_STORIES, DELETE_STORIES } from './types';
import axios from "axios";
import history from "../history";

export const createStories = formValues => {
    return async (dispatch, getState) => {
        const { user } = getState().auth;
        const response = await axios.post("https://ridonk-stories.herokuapp.com/api/story/", { ...formValues, user });
        dispatch({ type: CREATE_STORIES, payload: response.data })
    }
};

export const fetchStories = () => {
    return async dispatch => {

        const response = await axios.get("https://ridonk-stories.herokuapp.com/api/story/")
        dispatch({ type: FETCH_STORIES, payload: response.data });
    }
};

export const findByCat = cat => {
    return async dispatch => {
        const response = await axios.get(`https://ridonk-stories.herokuapp.com/api/story/${cat}`);
        dispatch({ type: FIND_BY_CAT, payload: response })
    }
}

// export const deleteStories = id => {
//     return async dispatch => {
//         await axios.delete(`/api/story/${id}`);
//         dispatch({ type: DELETE_STORIES, payload: id });
//         history.push("/")
//     }
// }