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

export default function WalletTransactionsPage() {
  const { selectedChain } = useSelectedChain();

  const [transferLoading, setTransferLoading] = React.useState(false);
  const [transferResponse, setTransferResponse] = React.useState('');

  const [broadcastLoading, setBroadcastLoading] = React.useState(false);
  const [broadcastResponse, setBroadcastResponse] = React.useState('');

  const [formData, setFormData] = React.useState({
    to: '',
    fromPrivateKey: '',
    amount: '',
    value: 0,
    from: '',
    txData: '',
    signatureId: '',
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: (e.target as HTMLInputElement).value,
    });
  };

  const sendTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTransferLoading(true);

    let response;

    try {
      switch (selectedChain) {
        case Chains.Ethereum:
          response = await TatumEthSDK(
            SDKOptions
          ).blockchain.blockchainTransfer({
            to: formData.to,
            fromPrivateKey: formData.fromPrivateKey,
            amount: formData.amount,
            currency: 'ETH',
          });
          break;
        case Chains.Polygon:
          response = await TatumPolygonSDK(
            SDKOptions
          ).blockchain.blockchainTransfer({
            to: formData.to,
            fromPrivateKey: formData.fromPrivateKey,
            amount: formData.amount,
            currency: 'MATIC',
          });
          break;
        case Chains.Bitcoin:
          response = await TatumBtcSDK(SDKOptions).blockchain.sendTransaction({
            fromAddress: [
              {
                address: formData.from,
                privateKey: formData.fromPrivateKey,
              },
            ],
            to: [
              {
                address: formData.to,
                value: formData.value,
              },
            ],
          });
          break;
        case Chains.Solana:
          response = await TatumSolanaSDK(
            SDKOptions
          ).blockchain.sendTransaction({
            from: formData.from,
            to: formData.to,
            amount: formData.amount,
            fromPrivateKey: formData.fromPrivateKey,
          });
          break;
        case Chains.Tron:
          response = TatumTronSDK(SDKOptions).blockchain.sendTransaction({
            fromPrivateKey: formData.fromPrivateKey,
            to: formData.to,
            amount: formData.amount,
          });
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
      setTransferLoading(false);
      return;
    }

    if (response)
      setTransferResponse(
        typeof response !== 'string' ? JSON.stringify(response) : response
      );
    setTransferLoading(false);
    toast.success('TX sent successfuly!');
  };

  const broadcastTx = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBroadcastLoading(true);

    let response;

    try {
      switch (selectedChain) {
        case Chains.Ethereum:
          response = await TatumEthSDK(SDKOptions).blockchain.broadcast({
            txData: formData.txData,
            signatureId: formData.signatureId
              ? formData.signatureId
              : undefined,
          });
          break;
        case Chains.Polygon:
          response = await TatumPolygonSDK(SDKOptions).blockchain.broadcast({
            txData: formData.txData,
            signatureId: formData.signatureId
              ? formData.signatureId
              : undefined,
          });
          break;
        case Chains.Bitcoin:
          response = await TatumBtcSDK(SDKOptions).blockchain.broadcast({
            txData: formData.txData,
            signatureId: formData.signatureId
              ? formData.signatureId
              : undefined,
          });
          break;
        case Chains.Solana:
          // todo
          return;
        case Chains.Tron:
          response = TatumTronSDK(SDKOptions).blockchain.broadcast({
            txData: formData.txData,
          });
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
      setBroadcastLoading(false);
      return;
    }

    if (response)
      setBroadcastResponse(
        typeof response !== 'string' ? JSON.stringify(response) : response
      );
    setBroadcastLoading(false);
    toast.success('Broadcasted successfuly!');
  };

  //const transferERC = async (e: React.FormEvent<HTMLFormElement>) => {
  // @todo
  //};

  return (
    <Layout>
      <Seo templateTitle='Wallet generate operations' />

      <main className='w-full overflow-y-hidden bg-white p-8'>
        <WalletSubMenu />

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Send native assets to address</h4>
          <form
            onSubmit={(e) => sendTransfer(e)}
            className='mt-2 flex w-full flex-wrap rounded-tl-md rounded-tr-md bg-neutral-100 pt-4 pb-3'
          >
            {![Chains.Ethereum, Chains.Polygon, Chains.Tron].includes(
              selectedChain
            ) && (
              <div className='mb-2 flex w-1/2 flex-row'>
                <div className='w-full px-3'>
                  <Input
                    required
                    inputType='text'
                    placeholder='SENDER ADDRESS'
                    name='from'
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
            )}

            <div
              className={clsxm(
                'mb-2 flex flex-row',
                ![Chains.Ethereum, Chains.Polygon, Chains.Tron].includes(
                  selectedChain
                )
                  ? 'w-1/2'
                  : 'w-full'
              )}
            >
              <div className='w-full px-3'>
                <Input
                  required
                  inputType='text'
                  placeholder='RECEIVING ADDRESS'
                  name='to'
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className='mb-2 flex w-4/5 flex-row'>
              <div className='w-full px-3'>
                <Input
                  required
                  inputType='text'
                  placeholder='PRIVATE KEY'
                  name='fromPrivateKey'
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className='mb-2 flex w-1/5 flex-row'>
              <div className='w-full px-3'>
                <Input
                  required
                  inputType={
                    selectedChain === Chains.Bitcoin ? 'number' : 'text'
                  }
                  placeholder='AMOUNT'
                  name={selectedChain === Chains.Bitcoin ? 'value' : 'amount'}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button isLoading={transferLoading} type='submit'>
                Send transaction
              </Button>
            </div>
          </form>

          <div
            className={clsxm(
              'flex w-full max-w-full flex-col items-center rounded-bl-md rounded-br-md bg-zinc-900 px-4 py-2 text-white transition-max-height duration-300 ease-in-out',
              transferResponse ? 'max-h-50' : 'max-h-0'
            )}
          >
            {transferResponse ? `Block: ${transferResponse}` : ''}
          </div>
        </div>

        {selectedChain !== Chains.Solana && (
          <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
            <h4>Broadcast transaction</h4>
            <form
              onSubmit={(e) => broadcastTx(e)}
              className='mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'
            >
              <div className='mb-2 flex w-full flex-row'>
                <div className='w-full px-3'>
                  <Input
                    required
                    inputType='text'
                    placeholder='TX DATA'
                    name='txData'
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              {selectedChain !== Chains.Tron && (
                <div className='mb-2 flex w-full flex-row'>
                  <div className='w-full px-3'>
                    <Input
                      inputType='text'
                      placeholder='SIGNATURE ID'
                      name='signatureId'
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>
              )}
              <div className='flex w-full flex-row items-center justify-start px-3'>
                <Button isLoading={broadcastLoading} type='submit'>
                  Broadcast
                </Button>
              </div>
            </form>

            <div
              className={clsxm(
                'flex w-full items-center rounded-bl-md rounded-br-md bg-zinc-900 px-4 py-2 text-white transition-max-height duration-300 ease-in-out',
                broadcastResponse ? 'max-h-50' : 'max-h-0'
              )}
            >
              {broadcastResponse}
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
