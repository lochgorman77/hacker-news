import React from 'react';
import { PaginationAppStyle } from '../PaginationApp';

const props = {
  handleFetchTopStories: jest.fn(),
  stories: [],
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

  // it('component updated ', () => {
  //   wrapper.setProps({ stories: stories });
  //   expect(wrapper.instance().props.handleFetchDetails).toBeCalled();
  // });
});
