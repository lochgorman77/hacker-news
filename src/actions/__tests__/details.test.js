import * as actions from '../details';
import { HackerNewsApi } from 'api/config';
import { detailsActions } from 'constants/ActionTypes';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import details from 'utils/test-data/details-new.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const detailId = '25428769';

describe('Details Actions', () => {
  it('should create an action fetchDetailsSuccess', () => {
    const expectedAction = {
      type: detailsActions.FETCH_DETAILS_SUCCESS,
      payload: details,
    };
    expect(actions.fetchDetailsSuccess(details)).toEqual(expectedAction);
  });

  it('should create an action fetchDetailsError', () => {
    const expectedAction = {
      type: detailsActions.FETCH_DETAILS_ERROR,
      payload: `Network Error`,
    };
    expect(actions.fetchDetailsError(`Network Error`)).toEqual(expectedAction);
  });

  it('should create an action resetDetails', () => {
    const expectedAction = {
      type: detailsActions.RESET,
    };
    expect(actions.resetDetails()).toEqual(expectedAction);
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

    it('mocks a network error to test FETCH_DETAILS_ERROR', () => {
      axiosMock.onGet(`/item/${detailId}.json`).networkError(function () {
        return new Promise(function (resolve, reject) {
          reject(new Error([404, { payload: 'networkError' }]));
        });
      });

      expect.assertions(2);
      return store.dispatch(actions.fetchDetails()).then(() => {
        const actions = store.getActions();
        expect(actions[1].type).toEqual(detailsActions.FETCH_DETAILS_ERROR);
        expect(actions[1].payload.message).toEqual('Request failed with status code 404');
      });
    });

    it('creates FETCH_DETAILS_SUCCESS when calling fetchDetails has finished', () => {
      axiosMock.onGet(`/item/${detailId}.json`).reply(function () {
        return new Promise(function (resolve, reject) {
          resolve([200, details]);
          reject(new Error([404, 'networkError']));
        });
      });

      const expectedActions = [
        {
          type: detailsActions.FETCH_DETAILS,
        },
        {
          type: detailsActions.FETCH_DETAILS_SUCCESS,
          payload: details,
        },
      ];

      expect.assertions(1);
      return store
        .dispatch(actions.fetchDetails(detailId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .catch((error) => {
          throw error;
        });
    });
  });
});
