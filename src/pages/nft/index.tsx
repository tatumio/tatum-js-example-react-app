import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NftSubMenu from '@/components/layout/nft/NftSubMenu';
import Seo from '@/components/Seo';

export default function NftPage() {
  return (
    <Layout>
      <Seo templateTitle='NFT operations' />

      <main className='h-[calc(100vh-81px)] w-full overflow-y-hidden bg-white p-8'>
        <NftSubMenu />

        <div className='layout flex h-full flex-col items-baseline justify-start text-left text-black'>
          <h2>NFT</h2>
          <p className='md:max-w-[55%]'>
            This section deals with NFT related operations.
          </p>
        </div>
      </main>
    </Layout>
  );
}
