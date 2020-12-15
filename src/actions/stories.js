import { HackerNewsApi } from 'api/config';
import { storiesActions, detailsActions } from './../constants/ActionTypes';

export function fetchTopStoriesSuccess(stories) {
  return {
    type: storiesActions.FETCH_TOP_STORIES_SUCCESS,
    payload: stories,
  };
}
export function fetchTopStoriesError(error) {
  return {
    type: storiesActions.FETCH_TOP_STORIES_ERROR,
    payload: error,
  };
}
export function fetchTopStories() {
  return function (dispatch) {
    dispatch({ type: storiesActions.FETCH_TOP_STORIES });
    dispatch({ type: detailsActions.RESET });

    return HackerNewsApi.get(`/topstories.json`)
      .then((result) => {
        dispatch(fetchTopStoriesSuccess(result.data));
      })
      .catch((error) => {
        dispatch(fetchTopStoriesError(error));
      });
  };
}

export function fetchNewStoriesSuccess(stories) {
  return {
    type: storiesActions.FETCH_NEW_STORIES_SUCCESS,
    payload: stories,
  };
}
export function fetchNewStoriesError(error) {
  return {
    type: storiesActions.FETCH_NEW_STORIES_ERROR,
    payload: error,
  };
}
export function fetchNewStories() {
  return function (dispatch) {
    dispatch({ type: storiesActions.FETCH_NEW_STORIES });
    dispatch({ type: detailsActions.RESET });

    return HackerNewsApi.get(`/newstories.json`)
      .then((result) => {
        dispatch(fetchNewStoriesSuccess(result.data));
      })
      .catch((error) => {
        dispatch(fetchNewStoriesError(error));
      });
  };
}
