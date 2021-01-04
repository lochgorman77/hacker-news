import React from 'react';
import { DetailStyle } from '../Detail';
import details from 'utils/test-data/details-new.json';

const props = { detail: details };

describe('<Detail />', () => {
  let shallow, wrapper;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
    wrapper = shallow(<DetailStyle {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.name()).toBe('MuiCard');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call timeAgo and return now', () => {
    const spy = jest.spyOn(wrapper.instance(), 'timeAgo');
    const timeago = wrapper.instance().timeAgo(Date.now() / 1000);
    expect(spy).toHaveBeenCalled();
    expect(timeago).toBe('now');
  });
});
