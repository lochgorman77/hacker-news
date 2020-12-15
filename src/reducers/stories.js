import { storiesActions, pageSize } from 'constants/ActionTypes';

const initialState = {
  top: [],
  new: [],
};

export default function roles(state = initialState, action) {
  switch (action.type) {
    case storiesActions.FETCH_TOP_STORIES_SUCCESS:
      return {
        ...state,
        top: action.payload,
      };
    case storiesActions.FETCH_TOP_STORIES_ERROR:
      return {
        ...state,
        top: initialState.top,
      };
    case storiesActions.FETCH_NEW_STORIES_SUCCESS:
      return {
        ...state,
        new: action.payload,
      };
    case storiesActions.FETCH_NEW_STORIES_ERROR:
      return {
        ...state,
        new: initialState.new,
      };
    default:
      return state;
  }
}
export const getTopStories = (state) => state.stories.top;
export const getNewStories = (state) => state.stories.new;
export const getPageCount = (state) => {
  return 500 / pageSize;
};
