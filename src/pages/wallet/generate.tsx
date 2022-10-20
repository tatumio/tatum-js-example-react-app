import { TatumBtcSDK } from '@tatumio/btc';
import { TatumEthSDK } from '@tatumio/eth';
import { TatumPolygonSDK } from '@tatumio/polygon';
import { TatumSolanaSDK } from '@tatumio/solana';
import { TatumTronSDK } from '@tatumio/tron';
import * as React from 'react';
import toast from 'react-hot-toast';

import clsxm from '@/lib/clsxm';
import { Chains, SDKOptions } from '@/lib/consts/sdk';
import { useSelectedChain } from '@/lib/context/appContext';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import WalletSubMenu from '@/components/layout/wallet/WalletSubMenu';
import Seo from '@/components/Seo';

export default function WalletGeneratePage() {
  const { selectedChain } = useSelectedChain();

  const [xpubLoading, setXpubLoading] = React.useState(false);
  const [xpubResponse, setXpubResponse] = React.useState('');

  const [privKeyLoading, setPrivKeyLoading] = React.useState(false);
  const [privKeyResponse, setPrivKeyResponse] = React.useState('');

  const [walletLoading, setWalletLoading] = React.useState(false);
  const [walletResponse, setWalletResponse] = React.useState('');

  const [formData, setFormData] = React.useState({
    xpub: '',
    i: 0,
    pk_mnemonic: '',
    wallet_mnemonic: '',
    solana_mnemonic: '',
    solana_privateKey: '',
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: (e.target as HTMLInputElement).value,
    });
  };

  const generateXpubAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setXpubLoading(true);

    let response;

    try {
      switch (selectedChain) {
        case Chains.Ethereum:
          response = TatumEthSDK(SDKOptions).wallet.generateAddressFromXPub(
            formData.xpub,
            formData.i
          );
          break;
        case Chains.Polygon:
          response = TatumPolygonSDK(SDKOptions).wallet.generateAddressFromXPub(
            formData.xpub,
            formData.i
          );
          break;
        case Chains.Bitcoin:
          response = TatumBtcSDK(SDKOptions).wallet.generateAddressFromXPub(
            formData.xpub,
            formData.i
          );
          break;
        case Chains.Solana:
          response = TatumSolanaSDK(
            SDKOptions
          ).wallet.generateAddressFromMnemonic(
            formData.solana_mnemonic,
            formData.i
          );
          break;
        case Chains.Tron:
          response = TatumTronSDK(SDKOptions).wallet.generateAddressFromXPub(
            formData.xpub,
            formData.i
          );
          break;
      }
    } catch (e) {
      if (e instanceof Error) {
        if (JSON.parse(e?.message)?.message) {
          toast.error(JSON.parse(e.message).message);
        } else {
          toast.error(e?.message);
        }
      }
      setXpubLoading(false);
      return;
    }

    if (response)
      setXpubResponse(
        typeof response !== 'string' ? JSON.stringify(response) : response
      );
    setXpubLoading(false);
    toast.success('Generated address successfuly!');
  };

  const generatePrivateKey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrivKeyLoading(true);

    let response;

    try {
      switch (selectedChain) {
        case Chains.Ethereum:
          response = await TatumEthSDK(
            SDKOptions
          ).wallet.generatePrivateKeyFromMnemonic(
            formData.pk_mnemonic,
            formData.i
          );
          break;
        case Chains.Polygon:
          response = await TatumPolygonSDK(
            SDKOptions
          ).wallet.generatePrivateKeyFromMnemonic(
            formData.pk_mnemonic,
            formData.i
          );
          break;
        case Chains.Bitcoin:
          response = await TatumBtcSDK(
            SDKOptions
          ).wallet.generatePrivateKeyFromMnemonic(
            formData.pk_mnemonic,
            formData.i
          );
          break;
        case Chains.Solana:
          toast.error(
            'Solana does not support privateKey generation from mnemonic!'
          );
          return;
        case Chains.Tron:
          response = await TatumTronSDK(
            SDKOptions
          ).wallet.generatePrivateKeyFromMnemonic(
            formData.pk_mnemonic,
            formData.i
          );
          break;
      }
    } catch (e) {
      if (e instanceof Error) {
        if (JSON.parse(e?.message)?.message) {
          toast.error(JSON.parse(e.message).message);
        } else {
          toast.error(e?.message);
        }
      }
      setPrivKeyLoading(false);
      return;
    }

    if (response) setPrivKeyResponse(response);
    setPrivKeyLoading(false);
    toast.success('Generated private key successfuly!');
  };

  const generateWallet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWalletLoading(true);

    let response;

    try {
      switch (selectedChain) {
        case Chains.Ethereum:
          response = await TatumEthSDK(SDKOptions).wallet.generateWallet(
            formData.wallet_mnemonic
          );
          break;
        case Chains.Polygon:
          response = await TatumPolygonSDK(SDKOptions).wallet.generateWallet(
            formData.wallet_mnemonic
          );
          break;
        case Chains.Bitcoin:
          response = await TatumBtcSDK(SDKOptions).wallet.generateWallet(
            formData.wallet_mnemonic
          );
          break;
        case Chains.Solana:
          response = TatumSolanaSDK(SDKOptions).wallet.wallet(
            formData.solana_privateKey || undefined
          );
          break;
        case Chains.Tron:
          response = await TatumTronSDK(SDKOptions).wallet.generateWallet(
            formData.wallet_mnemonic
          );
          break;
      }
    } catch (e) {
      if (e instanceof Error) {
        if (JSON.parse(e?.message)?.message) {
          toast.error(JSON.parse(e.message).message);
        } else {
          toast.error(e?.message);
        }
      }
      setWalletLoading(false);
      return;
    }

    if (response) setWalletResponse(JSON.stringify(response));
    setWalletLoading(false);
    toast.success('Generated wallet successfuly!');
  };

  return (
    <Layout>
      <Seo templateTitle='Wallet generate operations' />

      <main className='h-[calc(100vh-81px)] w-full overflow-y-hidden bg-white p-8'>
        <WalletSubMenu />

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>
            Address from {selectedChain === Chains.Solana ? 'Mnemonic' : 'XPUB'}
          </h4>
          <form
            onSubmit={(e) => generateXpubAddress(e)}
            className='mt-2 flex w-full flex-wrap rounded-tl-md rounded-tr-md bg-neutral-100 pt-4 pb-3'
          >
            <div className='mb-2 flex w-4/5 flex-row'>
              <div className='w-full px-3'>
                {selectedChain === Chains.Solana ? (
                  <Input
                    required
                    inputType='text'
                    placeholder='MNEMONIC PHRASE'
                    name='solana_mnemonic'
                    onChange={(e) => handleInputChange(e)}
                  />
                ) : (
                  <Input
                    required
                    inputType='text'
                    placeholder='XPUB'
                    name='xpub'
                    onChange={(e) => handleInputChange(e)}
                  />
                )}
              </div>
            </div>
            <div className='mb-2 flex w-1/5 flex-row'>
              <div className='w-full px-3'>
                <Input
                  required
                  inputType='text'
                  placeholder='INDEX'
                  name='i'
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button isLoading={xpubLoading} type='submit'>
                Generate address
              </Button>
            </div>
          </form>

          <div
            className={clsxm(
              'flex w-full items-center rounded-bl-md rounded-br-md bg-zinc-900 px-4 py-2 text-white transition-max-height duration-300 ease-in-out',
              xpubResponse ? 'max-h-50' : 'max-h-0'
            )}
          >
            {xpubResponse}
          </div>
        </div>

        {selectedChain !== Chains.Solana && (
          <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
            <h4>Private key from mnemonic</h4>
            <form
              onSubmit={(e) => generatePrivateKey(e)}
              className='mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'
            >
              <div className='mb-2 flex w-4/5 flex-row'>
                <div className='w-full px-3'>
                  <Input
                    required
                    inputType='text'
                    placeholder='MNEMONIC PHRASE'
                    name='pk_mnemonic'
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div className='mb-2 flex w-1/5 flex-row'>
                <div className='w-full px-3'>
                  <Input required inputType='text' placeholder='INDEX' />
                </div>
              </div>
              <div className='flex w-full flex-row items-center justify-start px-3'>
                <Button isLoading={privKeyLoading} type='submit'>
                  Generate private key
                </Button>
              </div>
            </form>

            <div
              className={clsxm(
                'flex w-full items-center rounded-bl-md rounded-br-md bg-zinc-900 px-4 py-2 text-white transition-max-height duration-300 ease-in-out',
                privKeyResponse ? 'max-h-50' : 'max-h-0'
              )}
            >
              {privKeyResponse}
            </div>
          </div>
        )}

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Wallet</h4>
          <form
            onSubmit={(e) => generateWallet(e)}
            className='mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'
          >
            <div className='mb-2 flex w-full flex-row'>
              <div className='w-full px-3'>
                {selectedChain === Chains.Solana ? (
                  <Input
                    inputType='text'
                    placeholder='PRIVATE KEY'
                    name='solana_privateKey'
                    onChange={(e) => handleInputChange(e)}
                  />
                ) : (
                  <Input
                    inputType='text'
                    placeholder='MNEMONIC PHRASE'
                    name='wallet_mnemonic'
                    onChange={(e) => handleInputChange(e)}
                  />
                )}
              </div>
            </div>
            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button isLoading={walletLoading} type='submit'>
                Generate wallet
              </Button>
            </div>
          </form>

          <div
            className={clsxm(
              'flex w-full items-center rounded-bl-md rounded-br-md bg-zinc-900 px-4 py-2 text-white transition-max-height duration-300 ease-in-out',
              walletResponse ? 'max-h-50' : 'max-h-0'
            )}
          >
            {walletResponse}
          </div>
        </div>
      </main>
    </Layout>
  );
}
