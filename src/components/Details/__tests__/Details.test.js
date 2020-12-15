import React from 'react';
import { DetailsStyle } from '../Details';
import details from 'utils/test-data/details-new.json';

const props = { details: [details] };

describe('<Detail />', () => {
  let shallow, wrapper;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
    wrapper = shallow(<DetailsStyle {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.name()).toBe('MuiGrid');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
