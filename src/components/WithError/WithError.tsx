import React from 'react';
import ErrorPage from 'next/error';
import { NextPage, NextPageContext } from 'next';
import { WithRouterProps } from 'next/dist/client/with-router';

export const withError = (Component: NextPage<any>) => {
  return class WithError extends React.Component<WithRouterProps & { statusCode?: number; [key: string]: any }> {
    static async getInitialProps(ctx: NextPageContext) {
      const props = (Component.getInitialProps ? await Component.getInitialProps(ctx) : null) || {};
      if (props.statusCode && ctx.res) {
        ctx.res.statusCode = props.statusCode;
      }
      return props;
    }
    render() {
      if (this.props.statusCode) {
        return <ErrorPage statusCode={this.props.statusCode} />;
      }
      return <Component {...this.props} />;
    }
  };
};
