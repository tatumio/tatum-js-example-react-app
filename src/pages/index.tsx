import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo
        templateTitle='Home'
        template={{
          description: 'Description of your site.',
        }}
      />
      <Seo />

      <main className='h-full w-full flex-grow overflow-y-hidden bg-white p-8'>
        <h2>Welcome,</h2>
        <p className='md:max-w-[55%]'>
          This example application has been built to showcase the different
          functionalities of the Tatum JS SDK. It is using Next.js/React and the
          Tatum-JS SDK. To start exploring you can start with the left sidebar
          menu and click through different examples and use-cases.
        </p>
      </main>
    </Layout>
  );
}
