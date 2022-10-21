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
import { handleInputChange } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import WalletSubMenu from '@/components/layout/wallet/WalletSubMenu';
import Seo from '@/components/Seo';

export default function WalletInfoPage() {
  const { selectedChain } = useSelectedChain();

  const [blockLoading, setBlockLoading] = React.useState(false);
  const [blockResponse, setBlockResponse] = React.useState('');

  const [txDetailLoading, setTxDetailLoading] = React.useState(false);
  const [txDetailResponse, setTxDetailResponse] = React.useState('');

  const [accountBalanceLoading, setAccountBalanceLoading] =
    React.useState(false);
  const [accountBalanceResponse, setAccountBalanceResponse] =
    React.useState('');

  const [currentBlockLoading, setCurrentBlockLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    blockHash: '',
    solana_blockHeight: 0,
    txHash: '',
    accountAddress: '',
  });

  const getCurrentBlock = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentBlockLoading(true);

    let response;

    try {
      switch (selectedChain) {
        case Chains.Ethereum:
          response = await TatumEthSDK(SDKOptions).blockchain.getCurrentBlock();
          break;
        case Chains.Polygon:
          response = await TatumPolygonSDK(
            SDKOptions
          ).blockchain.getCurrentBlock();
          break;
        case Chains.Bitcoin:
          toast.error('Bitcoin does not support the getCurrentBlock function!');
          return;
        case Chains.Solana:
          response = await TatumSolanaSDK(
            SDKOptions
          ).blockchain.getCurrentBlock();
          break;
        case Chains.Tron:
          response = await TatumTronSDK(
            SDKOptions
          ).blockchain.getCurrentBlock();
          break;
      }
    } catch (e) {
      if (e instanceof Error) toast.error(e?.message);
      setCurrentBlockLoading(false);
      return;
    }
    setCurrentBlockLoading(false);
    if (response)
      toast.success(
        `Current ${selectedChain} block is ${
          typeof response !== 'number'
            ? String(response?.blockNumber)
            : String(response)
        }`
      );
  };

  const getBlock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBlockLoading(true);

    let response;

    try {
      switch (selectedChain) {
        case Chains.Ethereum:
          response = await TatumEthSDK(SDKOptions).blockchain.getBlock(
            formData.blockHash
          );
          break;
        case Chains.Polygon:
          response = await TatumPolygonSDK(SDKOptions).blockchain.getBlock(
            formData.blockHash
          );
          break;
        case Chains.Bitcoin:
          response = await TatumBtcSDK(SDKOptions).blockchain.getBlock(
            formData.blockHash
          );
          break;
        case Chains.Solana:
          response = await TatumSolanaSDK(SDKOptions).blockchain.getBlock(
            formData.solana_blockHeight
          );
          break;
        case Chains.Tron:
          response = TatumTronSDK(SDKOptions).blockchain.getBlock(
            formData.blockHash
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
      setBlockLoading(false);
      return;
    }

    if (response)
      setBlockResponse(
        typeof response !== 'string' ? JSON.stringify(response) : response
      );
    setBlockLoading(false);
    toast.success('Block received successfuly!');
  };

  const getTxDetail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTxDetailLoading(true);

    let response;

    try {
      switch (selectedChain) {
        case Chains.Ethereum:
          response = await TatumEthSDK(SDKOptions).blockchain.get(
            formData.txHash
          );
          break;
        case Chains.Polygon:
          response = await TatumPolygonSDK(SDKOptions).blockchain.get(
            formData.txHash
          );
          break;
        case Chains.Bitcoin:
          response = await TatumBtcSDK(SDKOptions).blockchain.getTransaction(
            formData.txHash
          );
          break;
        case Chains.Solana:
          response = await TatumSolanaSDK(SDKOptions).blockchain.getTransaction(
            formData.txHash
          );
          return;
        case Chains.Tron:
          response = await TatumTronSDK(SDKOptions).blockchain.getTransaction(
            formData.txHash
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
      setTxDetailLoading(false);
      return;
    }

    // @todo: this response is huge, we need to display it more elegantly
    if (response)
      setTxDetailResponse(
        typeof response !== 'string' ? JSON.stringify(response) : response
      );
    setTxDetailLoading(false);
    toast.success('Received transaction successfuly!');
  };

  const getAccountBalance = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAccountBalanceLoading(true);

    let response;

    try {
      switch (selectedChain) {
        case Chains.Ethereum:
          response = await TatumEthSDK(
            SDKOptions
          ).blockchain.getBlockchainAccountBalance(formData.accountAddress);
          break;
        case Chains.Polygon:
          response = await TatumPolygonSDK(
            SDKOptions
          ).blockchain.getBlockchainAccountBalance(formData.accountAddress);
          break;
        case Chains.Bitcoin:
          response = await TatumBtcSDK(
            SDKOptions
          ).blockchain.getBlockchainAccountBalance(formData.accountAddress);
          break;
        case Chains.Solana:
          response = TatumSolanaSDK(SDKOptions).blockchain.getAccountBalance(
            formData.accountAddress
          );
          break;
        case Chains.Tron:
          response = await TatumTronSDK(SDKOptions).blockchain.getAccount(
            formData.accountAddress
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
      setAccountBalanceLoading(false);
      return;
    }

    if (response) setAccountBalanceResponse(JSON.stringify(response));
    setAccountBalanceLoading(false);
    toast.success('Generated wallet successfuly!');
  };

  return (
    <Layout>
      <Seo templateTitle='Wallet generate operations' />

      <main className='w-full overflow-y-hidden bg-white p-8'>
        <WalletSubMenu />

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Get block</h4>
          <form
            onSubmit={(e) => getBlock(e)}
            className='mt-2 flex w-full flex-wrap rounded-tl-md rounded-tr-md bg-neutral-100 pt-4 pb-3'
          >
            <div className='mb-2 flex w-full flex-row'>
              <div className='w-full px-3'>
                <Input
                  required
                  inputType={
                    selectedChain === Chains.Solana ? 'number' : 'text'
                  }
                  placeholder={
                    selectedChain === Chains.Solana
                      ? 'BLOCK HEIGHT'
                      : 'BLOCK HASH'
                  }
                  name={
                    selectedChain === Chains.Solana
                      ? 'solana_blockHeight'
                      : 'blockHash'
                  }
                  onChange={(e) => handleInputChange(e, setFormData, formData)}
                />
              </div>
            </div>
            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button isLoading={blockLoading} type='submit'>
                Get block
              </Button>
              {selectedChain !== Chains.Bitcoin && (
                <Button
                  className='ml-2'
                  isLoading={currentBlockLoading}
                  type='button'
                  onClick={(e) => getCurrentBlock(e)}
                >
                  Get current block
                </Button>
              )}
            </div>
          </form>

          <div
            className={clsxm(
              'word-break flex w-full max-w-full flex-col items-center overflow-scroll rounded-bl-md rounded-br-md bg-zinc-900 px-4 py-2 text-white transition-max-height duration-300 ease-in-out',
              blockResponse ? 'max-h-50' : 'max-h-0'
            )}
          >
            {blockResponse ? `Block: ${blockResponse}` : ''}
          </div>
        </div>

        {selectedChain !== Chains.Solana && (
          <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
            <h4>Get transaction information</h4>
            <form
              onSubmit={(e) => getTxDetail(e)}
              className='mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'
            >
              <div className='mb-2 flex w-full flex-row'>
                <div className='w-full px-3'>
                  <Input
                    required
                    inputType='text'
                    placeholder='TRANSACTION ADDRESS'
                    name='txHash'
                    onChange={(e) =>
                      handleInputChange(e, setFormData, formData)
                    }
                  />
                </div>
              </div>
              <div className='flex w-full flex-row items-center justify-start px-3'>
                <Button isLoading={txDetailLoading} type='submit'>
                  Get transaction
                </Button>
              </div>
            </form>

            <div
              className={clsxm(
                'flex w-full items-center rounded-bl-md rounded-br-md bg-zinc-900 px-4 py-2 text-white transition-max-height duration-300 ease-in-out',
                txDetailResponse ? 'max-h-50' : 'max-h-0'
              )}
            >
              {txDetailResponse}
            </div>
          </div>
        )}

        <div className='layout mb-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Get account balance</h4>
          <form
            onSubmit={(e) => getAccountBalance(e)}
            className='mt-2 flex w-full flex-wrap rounded-md bg-neutral-100 pt-4 pb-3'
          >
            <div className='mb-2 flex w-full flex-row'>
              <div className='w-full px-3'>
                <Input
                  inputType='text'
                  required
                  placeholder='ACCOUNT ADDRESS'
                  name='accountAddress'
                  onChange={(e) => handleInputChange(e, setFormData, formData)}
                />
              </div>
            </div>
            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button isLoading={accountBalanceLoading} type='submit'>
                Get account balance
              </Button>
            </div>
          </form>

          <div
            className={clsxm(
              'flex w-full items-center rounded-bl-md rounded-br-md bg-zinc-900 px-4 py-2 text-white transition-max-height duration-300 ease-in-out',
              accountBalanceResponse ? 'max-h-50' : 'max-h-0'
            )}
          >
            {accountBalanceResponse}
          </div>
        </div>
      </main>
    </Layout>
  );
}
