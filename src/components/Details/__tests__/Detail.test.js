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
});
