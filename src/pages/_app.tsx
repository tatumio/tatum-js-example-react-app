import App, { AppContext } from 'next/app';
import { FC, ReactNode } from 'react';
import 'regenerator-runtime/runtime';

import '@/styles/globals.css';

const NextApp = ({
  Component,
  pageProps,
}: {
  Component: FC<any>;
  pageProps: { children: ReactNode };
}) => {
  return <Component {...pageProps} />;
};

// Retrieve application context (user and props)
NextApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default NextApp;
