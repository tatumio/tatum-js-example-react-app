import App, { AppContext } from 'next/app';
import { FC, ReactNode } from 'react';
import 'regenerator-runtime/runtime';

import '@/styles/globals.css';

import { AppContextProvider } from '@/lib/context/appContext';

const NextApp = ({
  Component,
  pageProps,
}: {
  Component: FC<unknown>;
  pageProps: { children: ReactNode };
}) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
};

// Retrieve application context (user and props)
NextApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default NextApp;
