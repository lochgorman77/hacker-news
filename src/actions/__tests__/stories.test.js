import * as actions from '../stories';
import { HackerNewsApi } from 'api/config';
import { storiesActions, detailsActions } from 'constants/ActionTypes';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import stories from 'utils/test-data/stories-new.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Stories Actions', () => {
  it('should create an action fetchNewStoriesSuccess', () => {
    const expectedAction = {
      type: storiesActions.FETCH_NEW_STORIES_SUCCESS,
      payload: stories,
    };
    expect(actions.fetchNewStoriesSuccess(stories)).toEqual(expectedAction);
  });

  it('should create an action fetchNewStoriesError', () => {
    const expectedAction = {
      type: storiesActions.FETCH_NEW_STORIES_ERROR,
      payload: `Network Error`,
    };
    expect(actions.fetchNewStoriesError(`Network Error`)).toEqual(expectedAction);
  });

  it('should create an action fetchTopStoriesSuccess', () => {
    const expectedAction = {
      type: storiesActions.FETCH_TOP_STORIES_SUCCESS,
      payload: stories,
    };
    expect(actions.fetchTopStoriesSuccess(stories)).toEqual(expectedAction);
  });

  it('should create an action fetchTopStoriesError', () => {
    const expectedAction = {
      type: storiesActions.FETCH_TOP_STORIES_ERROR,
      payload: `Network Error`,
    };
    expect(actions.fetchTopStoriesError(`Network Error`)).toEqual(expectedAction);
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

    it('mocks a network error to test FETCH_TOP_STORIES_ERROR', () => {
      axiosMock.onGet(`/topstories.json`).networkError(function () {
        return new Promise(function (resolve, reject) {
          reject(new Error([404, { payload: 'Network Error' }]));
        });
      });

      expect.assertions(3);
      return store.dispatch(actions.fetchTopStories()).then(() => {
        const actions = store.getActions();
        expect(actions[1].type).toEqual(detailsActions.RESET);
        expect(actions[2].type).toEqual(storiesActions.FETCH_TOP_STORIES_ERROR);
        expect(actions[2].payload.message).toEqual('Network Error');
      });
    });

    it('creates FETCH_TOP_STORIES when calling fetchTopStories has finished', () => {
      axiosMock.onGet(`/topstories.json`).reply(function () {
        return new Promise(function (resolve, reject) {
          resolve([200, stories]);
          reject(new Error([404, 'networkError']));
        });
      });

      const expectedActions = [
        {
          type: storiesActions.FETCH_TOP_STORIES,
        },
        {
          type: detailsActions.RESET,
        },
        {
          type: storiesActions.FETCH_TOP_STORIES_SUCCESS,
          payload: stories,
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
        expect(actions[2].type).toEqual(storiesActions.FETCH_NEW_STORIES_ERROR);
        expect(actions[2].payload.message).toEqual('Network Error');
      });
    });

    it('creates FETCH_NEW_STORIES when calling fetchNewStories has finished', () => {
      axiosMock.onGet(`/newstories.json`).reply(function () {
        return new Promise(function (resolve, reject) {
          resolve([200, stories]);
          reject(new Error([404, 'networkError']));
        });
      });

      const expectedActions = [
        {
          type: storiesActions.FETCH_NEW_STORIES,
        },
        {
          type: detailsActions.RESET,
        },
        {
          type: storiesActions.FETCH_NEW_STORIES_SUCCESS,
          payload: stories,
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
