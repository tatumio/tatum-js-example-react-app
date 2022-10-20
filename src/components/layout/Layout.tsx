import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Header />
      <section className='flex h-full w-full flex-col md:flex-row'>
        <Sidebar />
        {children}
      </section>
      <Toaster
        toastOptions={{
          style: {
            wordBreak: 'break-all',
            maxWidth: 500,
          },
        }}
      />
    </>
  );
}
