import React from 'react';
import { IntlProvider } from '../IntlProvider';

const title = React.createElement('div', { key: 1 }, 'test');

const props = {
  locale: { code: 'en' },
  children: title,
};

describe('<IntlProvider />', () => {
  let shallow, wrapper;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<IntlProvider {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.name()).toBe('IntlProvider');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
