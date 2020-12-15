import { detailsActions } from './../constants/ActionTypes';

const initialState = {
  detail: [],
};

export default function roles(state = initialState, action) {
  switch (action.type) {
    case detailsActions.FETCH_DETAILS_SUCCESS:
      return {
        ...state,
        detail: [...state.detail, action.payload],
      };
    case detailsActions.FETCH_DETAILS_ERROR:
      return {
        ...state,
        detail: initialState.detail,
      };
    case detailsActions.RESET:
      return {
        ...state,
        detail: [],
      };
    default:
      return state;
  }
}
export const getDetails = (state) => state.details.detail;
