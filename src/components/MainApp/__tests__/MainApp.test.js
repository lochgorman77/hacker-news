import React from 'react';
import { MainAppStyle } from '../MainApp';

const props = {};

describe('<MainApp />', () => {
  let shallow, wrapper;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
    wrapper = shallow(<MainAppStyle {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.name()).toBe('section');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
