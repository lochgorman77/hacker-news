import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider as IP } from 'react-intl';

import translations from './translations/translations';

export class IntlProvider extends React.PureComponent {
  render() {
    const { locale } = this.props;
    return (
      <IP locale={locale.code} key={locale.code} messages={translations[locale.code]}>
        {React.Children.only(this.props.children)}
      </IP>
    );
  }
}
IntlProvider.propTypes = {
  locale: PropTypes.object,
  messages: PropTypes.array,
  children: PropTypes.element.isRequired,
};
export default IntlProvider;
