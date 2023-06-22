/*import {markersAPI} from "../api/markersAPI";

const LOAD_MARKERS = "LOAD_MARKERS"

let initialState = {
    markers : []
}

const markersReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_MARKERS:
            newState.markers = action.markers;
            return newState;
        default:
            return state;
    }
}

export function loadMarkersActionCreator(markers) {
    return {type: LOAD_MARKERS, markers : markers}
}

export const loadMarkersThunkCreator = () => (dispatch) => {
    return markersAPI.getMarkers().then(
        (data) => {
            if (data.status === 200 || data.status === 201 || data.status === 404) {
                dispatch(loadMarkersActionCreator(data.markers));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    )
}

export default markersReducer;*/