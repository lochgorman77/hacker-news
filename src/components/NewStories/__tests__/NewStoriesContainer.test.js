import React from 'react';
import { NewStoriesContainer } from '../NewStoriesContainer';
import stories from 'utils/test-data/stories-new.json';

const props = {
  handleFetchNewStories: jest.fn(),
  handleFetchDetails: jest.fn(),
  stories: [],
  details: [],
};

describe('<NewStoriesContainer />', () => {
  let shallow, wrapper;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<NewStoriesContainer {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.name()).toBe('Details');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('component updated ', () => {
    wrapper.setProps({ stories: stories });
    expect(wrapper.instance().props.handleFetchDetails).toBeCalled();
  });
});
