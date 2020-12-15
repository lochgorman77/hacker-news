import * as reducer from '../details';
import { detailsActions } from 'constants/ActionTypes';
import details from 'utils/test-data/details-new.json';

const initialSettings = {
  detail: [],
};

describe('Details reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.default(undefined, {})).toEqual(initialSettings);
  });

  it('should handle FETCH_DETAILS_SUCCESS', () => {
    expect(
      reducer.default(
        { detail: [] },
        {
          type: detailsActions.FETCH_DETAILS_SUCCESS,
          payload: details,
        }
      )
    ).toEqual({
      detail: [details],
    });
  });

  it('should handle FETCH_DETAILS_ERROR', () => {
    expect(
      reducer.default(
        { detail: [] },
        {
          type: detailsActions.FETCH_DETAILS_ERROR,
          payload: { error: 'error' },
        }
      )
    ).toEqual({ detail: [] });
  });

  it('should handle RESET', () => {
    expect(
      reducer.default(
        { detail: [] },
        {
          type: detailsActions.RESET,
        }
      )
    ).toEqual({ detail: [] });
  });

  it('should handle getDetails', () => {
    const appReducer = reducer.default({ detail: details }, {});
    const state = { details: appReducer };
    const detail = reducer.getDetails(state);
    expect(detail).toEqual(details);
  });
});
