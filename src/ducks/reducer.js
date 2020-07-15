const initialState = {
    username: '',
    profile: ''
}
const GET_USER = 'GET_USER';
const CLEAR_REDUX = 'CLEAR_REDUX';
const UPDATE_POSTS = 'UPDATE_POSTS';

export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
}
export function updatePosts(allPosts) {
    return {
        type: UPDATE_POSTS,
        payload: allPosts
    }
}
export function clearRedux() {
    return {
        type: CLEAR_REDUX,
        payload: {
            username: '',
            profile: '',
        }
    }
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_USER:
            const profile = action.payload.profile_pic;
            delete action.payload.profile_pic;
            return {...action.payload, profile};
        case UPDATE_POSTS:
            return {...state, posts:action.payload}
        case CLEAR_REDUX:
            return {...state, ...action.payload}
        default:
            return state
    }
}