import { storiesActions, pageSize } from 'constants/ActionTypes';

const initialState = {
  list: [],
  currentPage: 1,
};

export default function roles(state = initialState, action) {
  switch (action.type) {
    case storiesActions.FETCH_STORIES_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case storiesActions.FETCH_STORIES:
    case storiesActions.FETCH_STORIES_ERROR:
      return {
        ...state,
        list: initialState.list,
      };
    case storiesActions.UPDATE_STORIES_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}
export const getStories = (state) => {
  const offset = (state.stories.currentPage - 1) * pageSize;
  return state.stories.list.slice(offset).slice(0, pageSize);
};
export const getCurrentPage = (state) => state.stories.currentPage;
export const getPageCount = (state) => {
  return Math.ceil(state.stories.list.length / pageSize);
};
