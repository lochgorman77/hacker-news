import * as actions from '../stories';
import { HackerNewsApi } from 'api/config';
import { storiesActions, detailsActions } from 'constants/ActionTypes';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import testStories from 'utils/test-data/stories.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Stories Actions', () => {
  it('should create an action fetchStoriesSuccess', () => {
    const expectedAction = {
      type: storiesActions.FETCH_STORIES_SUCCESS,
      payload: testStories,
    };
    expect(actions.fetchStoriesSuccess(testStories)).toEqual(expectedAction);
  });

  it('should create an action fetchStoriesError', () => {
    const expectedAction = {
      type: storiesActions.FETCH_STORIES_ERROR,
      payload: `Network Error`,
    };
    expect(actions.fetchStoriesError(`Network Error`)).toEqual(expectedAction);
  });

  it('should create an action updateStoriesPage', () => {
    const expectedAction = {
      type: storiesActions.UPDATE_STORIES_PAGE,
      payload: 2,
    };
    expect(actions.updateStoriesPage(2)).toEqual(expectedAction);
  });

  describe('async actions', () => {
    let axiosMock;

    beforeEach(function () {
      axiosMock = new MockAdapter(HackerNewsApi);
    });
    afterEach(() => {
      axiosMock.reset();
      axiosMock.restore();
      store.clearActions();
    });

    it('mocks a network error to test FETCH_STORIES_ERROR', () => {
      axiosMock.onGet(`/topstories.json`).networkError(function () {
        return new Promise(function (resolve, reject) {
          reject(new Error([404, { payload: 'Network Error' }]));
        });
      });

      expect.assertions(3);
      return store.dispatch(actions.fetchTopStories()).then(() => {
        const actions = store.getActions();
        expect(actions[1].type).toEqual(detailsActions.RESET);
        expect(actions[2].type).toEqual(storiesActions.FETCH_STORIES_ERROR);
        expect(actions[2].payload.message).toEqual('Network Error');
      });
    });

    it('creates FETCH_STORIES when calling fetchStories has finished', () => {
      axiosMock.onGet(`/topstories.json`).reply(function () {
        return new Promise(function (resolve, reject) {
          resolve([200, testStories]);
          reject(new Error([404, 'networkError']));
        });
      });

      const expectedActions = [
        {
          type: storiesActions.FETCH_STORIES,
        },
        {
          type: detailsActions.RESET,
        },
        {
          type: storiesActions.UPDATE_STORIES_PAGE,
          payload: 1,
        },
        {
          type: storiesActions.FETCH_STORIES_SUCCESS,
          payload: testStories,
        },
      ];

      expect.assertions(1);
      return store
        .dispatch(actions.fetchTopStories())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .catch((error) => {
          throw error;
        });
    });

    it('mocks a network error to test FETCH_NEW_STORIES_ERROR', () => {
      axiosMock.onGet(`/newstories.json`).networkError(function () {
        return new Promise(function (resolve, reject) {
          reject(new Error([404, { payload: 'Network Error' }]));
        });
      });

      expect.assertions(3);
      return store.dispatch(actions.fetchNewStories()).then(() => {
        const actions = store.getActions();
        expect(actions[1].type).toEqual(detailsActions.RESET);
        expect(actions[2].type).toEqual(storiesActions.FETCH_STORIES_ERROR);
        expect(actions[2].payload.message).toEqual('Network Error');
      });
    });

    it('creates FETCH_NEW_STORIES when calling fetchNewStories has finished', () => {
      axiosMock.onGet(`/newstories.json`).reply(function () {
        return new Promise(function (resolve, reject) {
          resolve([200, testStories]);
          reject(new Error([404, 'networkError']));
        });
      });

      const expectedActions = [
        {
          type: storiesActions.FETCH_STORIES,
        },
        {
          type: detailsActions.RESET,
        },
        {
          type: storiesActions.UPDATE_STORIES_PAGE,
          payload: 1,
        },
        {
          type: storiesActions.FETCH_STORIES_SUCCESS,
          payload: testStories,
        },
      ];

      expect.assertions(1);
      return store
        .dispatch(actions.fetchNewStories())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .catch((error) => {
          throw error;
        });
    });
  });
});
