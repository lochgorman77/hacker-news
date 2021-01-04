import React from 'react';
import { TopStoriesContainer } from '../TopStoriesContainer';
import testStories from 'utils/test-data/stories.json';

const props = {
  handleFetchTopStories: jest.fn(),
  handleFetchDetails: jest.fn(),
  stories: [],
  details: [],
};

describe('<TopStoriesContainer />', () => {
  let shallow, wrapper;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<TopStoriesContainer {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.name()).toBe('Details');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('component updated ', () => {
    wrapper.setProps({ stories: testStories.slice(0, 8) });
    expect(wrapper.instance().props.handleFetchDetails).toBeCalled();
  });
});
