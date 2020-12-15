import * as reducer from '../stories';
import { storiesActions } from 'constants/ActionTypes';
import stories from 'utils/test-data/stories-new.json';

const initialSettings = {
  top: [],
  new: [],
};

describe('Stories reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.default(undefined, {})).toEqual(initialSettings);
  });

  it('should handle FETCH_TOP_STORIES_SUCCESS', () => {
    expect(
      reducer.default(
        { top: [] },
        {
          type: storiesActions.FETCH_TOP_STORIES_SUCCESS,
          payload: stories,
        }
      )
    ).toEqual({
      top: stories,
    });
  });

  it('should handle FETCH_TOP_STORIES_ERROR', () => {
    expect(
      reducer.default(
        { top: [] },
        {
          type: storiesActions.FETCH_TOP_STORIES_ERROR,
          payload: { error: 'error' },
        }
      )
    ).toEqual({ top: [] });
  });

  it('should handle FETCH_NEW_STORIES_SUCCESS', () => {
    expect(
      reducer.default(
        { new: [] },
        {
          type: storiesActions.FETCH_NEW_STORIES_SUCCESS,
          payload: stories,
        }
      )
    ).toEqual({
      new: stories,
    });
  });

  it('should handle FETCH_NEW_STORIES_ERROR', () => {
    expect(
      reducer.default(
        { new: [] },
        {
          type: storiesActions.FETCH_NEW_STORIES_ERROR,
          payload: { error: 'error' },
        }
      )
    ).toEqual({ new: [] });
  });

  it('should handle getTopStories', () => {
    const appReducer = reducer.default({ top: stories }, {});
    const state = { stories: appReducer };
    const topStories = reducer.getTopStories(state);
    expect(topStories).toEqual(stories);
  });

  it('should handle getNewStories', () => {
    const appReducer = reducer.default({ new: stories }, {});
    const state = { stories: appReducer };
    const newStories = reducer.getNewStories(state);
    expect(newStories).toEqual(stories);
  });
});
