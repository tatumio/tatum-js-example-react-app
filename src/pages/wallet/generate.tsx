import * as React from 'react';

import { useSelectedChain } from '@/lib/context/appContext';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import WalletSubMenu from '@/components/layout/wallet/WalletSubMenu';
import Seo from '@/components/Seo';

export default function WalletGeneratePage() {
  const { selectedChain } = useSelectedChain();

  return (
    <Layout>
      <Seo templateTitle='Wallet generate operations' />

      <main className='h-[calc(100vh-81px)] w-full overflow-y-hidden bg-white p-8'>
        <WalletSubMenu />

        <div className='mb-8 text-slate-400'>
          {'Currently selected chain is: ' + selectedChain}
        </div>

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Address from XPUB</h4>
          <form className='mb-3 mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'>
            <div className='mb-2 flex w-4/5 flex-row'>
              <div className='w-full px-3'>
                <Input required inputType='text' placeholder='XPUB' />
              </div>
            </div>
            <div className='mb-2 flex w-1/5 flex-row'>
              <div className='w-full px-3'>
                <Input required inputType='text' placeholder='INDEX' />
              </div>
            </div>
            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button type='submit'>Generate address</Button>
            </div>
          </form>
        </div>

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Private key from mnemonic</h4>
          <form className='mb-3 mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'>
            <div className='mb-2 flex w-4/5 flex-row'>
              <div className='w-full px-3'>
                <Input
                  required
                  inputType='text'
                  placeholder='MNEMONIC PHRASE'
                />
              </div>
            </div>
            <div className='mb-2 flex w-1/5 flex-row'>
              <div className='w-full px-3'>
                <Input required inputType='text' placeholder='INDEX' />
              </div>
            </div>
            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button type='submit'>Generate private key</Button>
            </div>
          </form>
        </div>

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Wallet</h4>
          <form className='mb-3 mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'>
            <div className='mb-2 flex w-full flex-row'>
              <div className='w-full px-3'>
                <Input
                  required
                  inputType='text'
                  placeholder='MNEMONIC PHRASE'
                />
              </div>
            </div>
            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button type='submit'>Generate wallet</Button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
}
