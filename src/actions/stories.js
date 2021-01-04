import { HackerNewsApi } from 'api/config';
import { storiesActions, detailsActions } from 'constants/ActionTypes';

export function fetchStoriesSuccess(stories) {
  return {
    type: storiesActions.FETCH_STORIES_SUCCESS,
    payload: stories,
  };
}
export function fetchStoriesError(error) {
  return {
    type: storiesActions.FETCH_STORIES_ERROR,
    payload: error,
  };
}
export function fetchTopStories() {
  return function (dispatch) {
    dispatch({ type: storiesActions.FETCH_STORIES });
    dispatch({ type: detailsActions.RESET });

    return HackerNewsApi.get(`/topstories.json`)
      .then((result) => {
        dispatch(updateStoriesPage(1));
        dispatch(fetchStoriesSuccess(result.data));
      })
      .catch((error) => {
        dispatch(fetchStoriesError(error));
      });
  };
}

export function fetchNewStories() {
  return function (dispatch) {
    dispatch({ type: storiesActions.FETCH_STORIES });
    dispatch({ type: detailsActions.RESET });

    return HackerNewsApi.get(`/newstories.json`)
      .then((result) => {
        dispatch(updateStoriesPage(1));
        dispatch(fetchStoriesSuccess(result.data));
      })
      .catch((error) => {
        dispatch(fetchStoriesError(error));
      });
  };
}

export function updateStoriesPage(page) {
  return {
    type: storiesActions.UPDATE_STORIES_PAGE,
    payload: page,
  };
}
