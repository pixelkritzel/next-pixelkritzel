import * as React from 'react';
import { NextPage } from 'next';
import { Layout } from 'src/components/Layout';
// import App from 'next/app'

function MyApp({ Component, pageProps }: { Component: NextPage; pageProps: { [key: string]: any } }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
