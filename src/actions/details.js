import { HackerNewsApi } from 'api/config';
import { detailsActions } from 'constants/ActionTypes';

export function fetchDetailsSuccess(detail) {
  return {
    type: detailsActions.FETCH_DETAILS_SUCCESS,
    payload: detail,
  };
}
export function fetchDetailsError(error) {
  return {
    type: detailsActions.FETCH_DETAILS_ERROR,
    payload: error,
  };
}
export function fetchDetails(detailId) {
  return function (dispatch) {
    dispatch({ type: detailsActions.FETCH_DETAILS });

    return HackerNewsApi.get(`/item/${detailId}.json`)
      .then((result) => {
        dispatch(fetchDetailsSuccess(result.data));
      })
      .catch((error) => {
        dispatch(fetchDetailsError(error));
      });
  };
}
