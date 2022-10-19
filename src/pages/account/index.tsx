import * as React from 'react';

import AccountSubMenu from '@/components/layout/account/AccountSubMenu';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function AccountPage() {
  return (
    <Layout>
      <Seo templateTitle='Account operations' />

      <main className='h-[calc(100vh-81px)] w-full overflow-y-hidden bg-white p-8'>
        <AccountSubMenu />

        <div className='layout flex h-full flex-col items-baseline justify-start text-left text-black'>
          <h2>Virtual Accounts</h2>
          <p className='md:max-w-[55%]'>
            This section deals with Tatum&apos;s virtual accounts. They&apos;re
            management, creation, updating and related ledger and blockchain
            opeartions.
          </p>
        </div>
      </main>
    </Layout>
  );
}
