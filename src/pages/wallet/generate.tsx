import { TatumBtcSDK } from '@tatumio/btc';
import { TatumEthSDK } from '@tatumio/eth';
import { TatumPolygonSDK } from '@tatumio/polygon';
import { TatumTronSDK } from '@tatumio/tron';
import * as React from 'react';
import toast from 'react-hot-toast';

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
          // @todo: Solana needs UI changes
          response = null;
          toast.error('Solana does not support address generation from XPUB!');
          return;
        case Chains.Tron:
          response = TatumTronSDK(SDKOptions).wallet.generateAddressFromXPub(
            formData.xpub,
            formData.i
          );
      }
    } catch (e) {
      if (e instanceof Error) toast.error(e?.message);
      setXpubLoading(false);
      return;
    }

    if (response) setXpubResponse(response);
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
          // @todo: Solana needs UI changes
          response = null;
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
      }
    } catch (e) {
      if (e instanceof Error) toast.error(e?.message);
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
          // @todo: Solana needs UI changes
          response = null;
          toast.error(
            'Solana does not support wallet generation from mnemonic!'
          );
          return;
        case Chains.Tron:
          response = await TatumTronSDK(SDKOptions).wallet.generateWallet(
            formData.wallet_mnemonic
          );
      }
    } catch (e) {
      if (e instanceof Error) toast.error(e?.message);
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
          <h4>Address from XPUB</h4>
          <form
            onSubmit={(e) => generateXpubAddress(e)}
            className='mb-3 mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'
          >
            <div className='mb-2 flex w-4/5 flex-row'>
              <div className='w-full px-3'>
                <Input
                  required
                  inputType='text'
                  placeholder='XPUB'
                  name='xpub'
                  onChange={(e) => handleInputChange(e)}
                />
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
              <span className='ml-4'>{xpubResponse}</span>
            </div>
          </form>
        </div>

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Private key from mnemonic</h4>
          <form
            onSubmit={(e) => generatePrivateKey(e)}
            className='mb-3 mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'
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
              <span className='ml-4'>{privKeyResponse}</span>
            </div>
          </form>
        </div>

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Wallet</h4>
          <form
            onSubmit={(e) => generateWallet(e)}
            className='mb-3 mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'
          >
            <div className='mb-2 flex w-full flex-row'>
              <div className='w-full px-3'>
                <Input
                  required
                  inputType='text'
                  placeholder='MNEMONIC PHRASE'
                  name='wallet_mnemonic'
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button isLoading={walletLoading} type='submit'>
                Generate wallet
              </Button>
              <span className='ml-4'>{walletResponse}</span>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
}
