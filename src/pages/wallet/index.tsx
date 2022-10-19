import * as React from 'react';

import Layout from '@/components/layout/Layout';
import WalletSubMenu from '@/components/layout/wallet/WalletSubMenu';
import Seo from '@/components/Seo';

export default function WalletPage() {
  return (
    <Layout>
      <Seo templateTitle='Wallet operations' />

      <main className='h-[calc(100vh-81px)] w-full overflow-y-hidden bg-white p-8'>
        <WalletSubMenu />

        <div className='layout flex h-full flex-col items-baseline justify-start text-left text-black'>
          <h2>Wallet, blockchain, etc.</h2>
          <p className='md:max-w-[55%]'>
            This section deals with various wallet, address and blockchain
            related operations.
          </p>
        </div>
      </main>
    </Layout>
  );
}
