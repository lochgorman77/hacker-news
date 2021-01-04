import * as reducer from '../stories';
import { storiesActions, pageSize } from 'constants/ActionTypes';
import testStories from 'utils/test-data/stories.json';

const initialSettings = {
  currentPage: 1,
  list: [],
};

describe('Stories reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.default(undefined, {})).toEqual(initialSettings);
  });

  it('should handle FETCH_STORIES_SUCCESS', () => {
    expect(
      reducer.default(
        { list: [] },
        {
          type: storiesActions.FETCH_STORIES_SUCCESS,
          payload: testStories,
        }
      )
    ).toEqual({
      list: testStories,
    });
  });

  it('should handle FETCH_STORIES_ERROR', () => {
    expect(
      reducer.default(
        { list: testStories },
        {
          type: storiesActions.FETCH_STORIES_ERROR,
          payload: { error: 'error' },
        }
      )
    ).toEqual({ list: [] });
  });

  it('should handle FETCH_STORIES', () => {
    expect(
      reducer.default(
        { list: testStories },
        {
          type: storiesActions.FETCH_STORIES,
        }
      )
    ).toEqual({ list: [] });
  });

  it('should handle UPDATE_STORIES_PAGE', () => {
    expect(
      reducer.default(
        { list: testStories },
        {
          type: storiesActions.UPDATE_STORIES_PAGE,
          payload: 2,
        }
      )
    ).toEqual({ list: testStories, currentPage: 2 });
  });

  it('should handle getStories', () => {
    const appReducer = reducer.default({ list: testStories, currentPage: 1 }, {});
    const state = { stories: appReducer };
    const stories = reducer.getStories(state);
    expect(stories.length).toEqual(pageSize);
  });

  it('should handle getCurrentPage', () => {
    const appReducer = reducer.default({ list: testStories, currentPage: 1 }, {});
    const state = { stories: appReducer };
    const currentPage = reducer.getCurrentPage(state);
    expect(currentPage).toEqual(1);
  });

  it('should handle getPageCount', () => {
    const appReducer = reducer.default({ list: testStories, currentPage: 1 }, {});
    const state = { stories: appReducer };
    const pageCount = reducer.getPageCount(state);
    // 63 calculated from test stories length (500/8 and rounded up)
    expect(pageCount).toEqual(63);
  });
});
