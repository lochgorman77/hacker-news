import React from 'react';
import { App } from '../App';

const props = {};

describe('<App />', () => {
  let shallow, wrapper;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<App {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.name()).toBe('Provider');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
