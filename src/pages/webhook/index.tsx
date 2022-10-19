import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function WebhookPage() {
  return (
    <Layout>
      <Seo templateTitle='Webhook operations' />

      <main className='h-[calc(100vh-81px)] w-full overflow-y-hidden bg-white p-8'>
        <div className='layout flex h-full flex-col items-baseline justify-start text-left text-black'>
          <h2>Webhooks</h2>
          <p className='md:max-w-[55%]'>
            This section deals with registering and handling webhooks. As well
            as working with the HMAC secret.
          </p>
        </div>
      </main>
    </Layout>
  );
}
