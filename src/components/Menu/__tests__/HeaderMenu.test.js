import React from 'react';
import HeaderMenu from '../HeaderMenu';

const props = {};

describe('<Detail />', () => {
  let shallow, wrapper;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<HeaderMenu {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.name()).toBe('div');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
