import * as React from 'react';

import { withRouter } from 'next/router';
import { NextPageContext } from 'next/types';

import { WithRouterProps } from 'next/dist/client/with-router';

class Home extends React.Component<WithRouterProps> {
  static async getInitialProps(first: NextPageContext) {
    return {};
  }

  render() {
    const { query } = this.props.router;
    const { slug } = query;

    return <h1>Hello to {slug}</h1>;
  }
}

export default withRouter(Home);
