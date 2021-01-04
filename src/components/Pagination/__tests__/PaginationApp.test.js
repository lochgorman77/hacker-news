import React from 'react';
import { PaginationAppStyle } from '../PaginationApp';

const props = {
  count: 60,
  currentPage: 1,
  handleUpdateStoriesPage: jest.fn(),
  handleResetDetails: jest.fn(),
};

describe('<TopStoriesContainer />', () => {
  let shallow, wrapper;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
    wrapper = shallow(<PaginationAppStyle {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.name()).toBe('div');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call handleChange ', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange({}, 2);
    expect(spy).toHaveBeenCalled();
    expect(props.handleUpdateStoriesPage.mock.calls.length).toBe(1);
    expect(props.handleResetDetails.mock.calls.length).toBe(1);
  });
});
