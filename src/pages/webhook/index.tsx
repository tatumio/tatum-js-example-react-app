import { TatumEthSDK } from '@tatumio/eth';
import * as React from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { Column } from 'react-table';

import { SDKOptions } from '@/lib/consts/sdk';
import { useSelectedChain } from '@/lib/context/appContext';
import { handleInputChange } from '@/lib/utils';

import ResponseBox from '@/components/boxes/ResponseBox';
import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/Table';

type subscriptionType =
  | 'ADDRESS_TRANSACTION'
  | 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION'
  | 'ACCOUNT_PENDING_BLOCKCHAIN_TRANSACTION'
  | 'CUSTOMER_TRADE_MATCH'
  | 'CUSTOMER_PARTIAL_TRADE_MATCH'
  | 'TRANSACTION_IN_THE_BLOCK'
  | 'KMS_FAILED_TX'
  | 'KMS_COMPLETED_TX'
  | 'ACCOUNT_BALANCE_LIMIT'
  | 'TRANSACTION_HISTORY_REPORT';

export default function WebhookPage() {
  const { selectedChain } = useSelectedChain();

  const [createLoading, setCreateLoading] = React.useState(false);
  const [createResponse, setCreateResponse] = React.useState('');

  const [hmacLoading, setHmacLoading] = React.useState(false);

  // Setup data and columns for subscriptions table
  const [subscriptions, setSubscriptions] = React.useState<string[]>([]);
  const subscriptionsColumns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Attributes',
        accessor: 'attr',
      },
    ],
    []
  );

  // Get subscriptions data for the table
  const getSubscriptions = React.useCallback(
    async (pageIndex: number, pageSize: number) => {
      const response = await TatumEthSDK(
        SDKOptions
      ).subscriptions.getSubscriptions(pageSize, pageIndex);

      setSubscriptions(
        response.map((r) => {
          r.attr = JSON.stringify(r.attr);
          return r as unknown as string;
        })
      );
    },
    []
  );

  // Setup data and columns for webhook table
  const [webhooks, setWebhooks] = React.useState<string[]>([]);
  const webhookColumns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'URL',
        accessor: 'url',
      },
      {
        Header: 'Data',
        accessor: 'data',
      },
      {
        Header: 'Time',
        accessor: 'timestamp',
      },
    ],
    []
  );

  // Get webhook data for the table
  const getWebhooks = React.useCallback(
    async (pageIndex: number, pageSize: number) => {
      const response = await TatumEthSDK(
        SDKOptions
      ).subscriptions.getAllWebhooks(pageSize, pageIndex);

      setWebhooks(
        response.map((r) => {
          r.data = JSON.stringify(r.data);
          return r as unknown as string;
        })
      );
    },
    []
  );

  // Setup base form data
  const [formData, setFormData] = React.useState<{
    type: subscriptionType;
    id: string;
    url: string;
    typeOfBalance: 'account' | 'available';
    interval: number;
    limit: string;
    address: string;
    hmacSecret: string;
  }>({
    type: 'ADDRESS_TRANSACTION',
    id: '',
    url: 'https://dashboard.tatum.io/webhook-handler',
    typeOfBalance: 'account',
    interval: 0,
    limit: '',
    address: '',
    hmacSecret: '',
  });

  // Subscription types
  const subscriptionTypes: {
    value: subscriptionType;
    label: subscriptionType;
  }[] = [
    { value: 'ADDRESS_TRANSACTION', label: 'ADDRESS_TRANSACTION' },
    {
      value: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
      label: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    },
    {
      value: 'ACCOUNT_PENDING_BLOCKCHAIN_TRANSACTION',
      label: 'ACCOUNT_PENDING_BLOCKCHAIN_TRANSACTION',
    },
    { value: 'CUSTOMER_TRADE_MATCH', label: 'CUSTOMER_TRADE_MATCH' },
    {
      value: 'CUSTOMER_PARTIAL_TRADE_MATCH',
      label: 'CUSTOMER_PARTIAL_TRADE_MATCH',
    },
    { value: 'TRANSACTION_IN_THE_BLOCK', label: 'TRANSACTION_IN_THE_BLOCK' },
    { value: 'KMS_FAILED_TX', label: 'KMS_FAILED_TX' },
    { value: 'KMS_COMPLETED_TX', label: 'KMS_COMPLETED_TX' },
    { value: 'ACCOUNT_BALANCE_LIMIT', label: 'ACCOUNT_BALANCE_LIMIT' },
    {
      value: 'TRANSACTION_HISTORY_REPORT',
      label: 'TRANSACTION_HISTORY_REPORT',
    },
  ];

  // Handle type change
  const handleSelectChange = (
    e: {
      value: string;
      label: string;
    } | null
  ) => {
    if (e) setFormData({ ...formData, type: e.value as subscriptionType });
  };

  // Enable HMAC call
  const enableHmac = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHmacLoading(true);

    try {
      await TatumEthSDK(SDKOptions).subscriptions.enableWebHookHmac({
        hmacSecret: formData.hmacSecret,
      });
    } catch (err) {
      if (err instanceof Error) {
        if (JSON.parse(err?.message)?.message) {
          toast.error(JSON.parse(err.message).message);
        } else {
          toast.error(err?.message);
        }
      }
      setHmacLoading(false);
      return;
    }

    setHmacLoading(false);
    toast.success('HMAC digest enabled!');
  };

  // Disable HMAC Call
  const disableHmac = async () => {
    setHmacLoading(true);

    try {
      await TatumEthSDK(SDKOptions).subscriptions.disableWebHookHmac();
    } catch (err) {
      if (err instanceof Error) {
        if (JSON.parse(err?.message)?.message) {
          toast.error(JSON.parse(err.message).message);
        } else {
          toast.error(err?.message);
        }
      }
      setHmacLoading(false);
      return;
    }

    setHmacLoading(false);
    toast.success('HMAC digest disabled!');
  };

  // Register a new webhook call
  const registerWebhook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateLoading(true);

    let response;

    try {
      switch (formData.type) {
        case 'ADDRESS_TRANSACTION':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: 'ADDRESS_TRANSACTION',
            attr: {
              url: formData.url,
              chain: selectedChain,
              address: formData.address,
            },
          });
          break;
        case 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
            attr: {
              url: formData.url,
              id: formData.id,
            },
          });
          break;
        case 'ACCOUNT_PENDING_BLOCKCHAIN_TRANSACTION':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: 'ACCOUNT_PENDING_BLOCKCHAIN_TRANSACTION',
            attr: {
              url: formData.url,
              id: formData.id,
            },
          });
          break;
        case 'CUSTOMER_TRADE_MATCH':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: 'CUSTOMER_TRADE_MATCH',
            attr: {
              url: formData.url,
              id: formData.id,
            },
          });
          break;
        case 'CUSTOMER_PARTIAL_TRADE_MATCH':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: 'CUSTOMER_PARTIAL_TRADE_MATCH',
            attr: {
              url: formData.url,
              id: formData.id,
            },
          });
          break;
        case 'TRANSACTION_IN_THE_BLOCK':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: 'TRANSACTION_IN_THE_BLOCK',
            attr: {
              url: formData.url,
            },
          });
          break;
        case 'KMS_FAILED_TX':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: 'KMS_FAILED_TX',
            attr: {
              url: formData.url,
            },
          });
          break;
        case 'KMS_COMPLETED_TX':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: 'KMS_COMPLETED_TX',
            attr: {
              url: formData.url,
            },
          });
          break;
        case 'ACCOUNT_BALANCE_LIMIT':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: 'ACCOUNT_BALANCE_LIMIT',
            attr: {
              limit: formData.limit,
              typeOfBalance: formData.typeOfBalance,
            },
          });
          break;
        case 'TRANSACTION_HISTORY_REPORT':
          response = await TatumEthSDK(
            SDKOptions
          ).subscriptions.createSubscription({
            type: formData.type,
            attr: {
              interval: formData.interval,
            },
          });
          break;
      }
    } catch (err) {
      if (err instanceof Error) {
        if (JSON.parse(err?.message)?.message) {
          toast.error(JSON.parse(err.message).message);
        } else {
          toast.error(err?.message);
        }
      }
      setCreateLoading(false);
      return;
    }

    if (response)
      setCreateResponse(
        typeof response !== 'string' ? JSON.stringify(response) : response
      );
    setCreateLoading(false);
    toast.success('TX sent successfuly!');
  };

  return (
    <Layout>
      <Seo templateTitle='Webhook operations' />

      <main className='h-full w-full bg-white p-8'>
        <div className='layout flex h-full flex-col items-baseline justify-start text-left text-black'>
          <h2>Webhooks</h2>
          <p className='md:max-w-[55%]'>
            This section deals with registering and handling webhooks. As well
            as working with the HMAC secret.
          </p>
        </div>

        <div className='layout mb-8 mt-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>Create subscription</h4>
          <form
            onSubmit={(e) => registerWebhook(e)}
            className='mt-2 flex w-full flex-wrap rounded-tl-md rounded-tr-md bg-neutral-100 pt-4 pb-3'
          >
            <div className='mb-2 flex w-full flex-row'>
              <div className='w-full px-3'>
                <label className='font-semibold text-gray-400'>
                  SUBSCRIPTION TYPE <span className='text-[red]'>*</span>
                  <Select
                    options={subscriptionTypes}
                    value={{ value: formData.type, label: formData.type }}
                    onChange={(e) => handleSelectChange(e)}
                  />
                </label>
              </div>
            </div>

            {!['ACCOUNT_BALANCE_LIMIT', 'TRANSACTION_HISTORY_REPORT'].includes(
              formData.type
            ) && (
              <div className='mb-2 flex w-full flex-row'>
                <div className='w-full px-3'>
                  <Input
                    required
                    inputType='text'
                    placeholder='URL'
                    name='url'
                    value={formData.url}
                    onChange={(e) =>
                      handleInputChange(e, setFormData, formData)
                    }
                  />
                </div>
              </div>
            )}

            {![
              'ACCOUNT_BALANCE_LIMIT',
              'TRANSACTION_HISTORY_REPORT',
              'KMS_COMPLETED_TX',
              'KMS_FAILED_TX',
              'TRANSACTION_IN_THE_BLOCK',
              'ADDRESS_TRANSACTION',
            ].includes(formData.type) && (
              <div className='mb-2 flex w-full flex-row'>
                <div className='w-full px-3'>
                  <Input
                    required
                    inputType='text'
                    placeholder='ID'
                    name='id'
                    onChange={(e) =>
                      handleInputChange(e, setFormData, formData)
                    }
                  />
                </div>
              </div>
            )}

            {formData.type === 'ADDRESS_TRANSACTION' && (
              <div className='mb-2 flex w-full flex-row'>
                <div className='w-full px-3'>
                  <Input
                    required
                    inputType='text'
                    placeholder='ADDRESS'
                    name='address'
                    onChange={(e) =>
                      handleInputChange(e, setFormData, formData)
                    }
                  />
                </div>
              </div>
            )}

            {formData.type === 'TRANSACTION_HISTORY_REPORT' && (
              <div className='mb-2 flex w-full flex-row'>
                <div className='w-full px-3'>
                  <Input
                    required
                    inputType='number'
                    placeholder='INTERVAL'
                    name='interval'
                    onChange={(e) =>
                      handleInputChange(e, setFormData, formData)
                    }
                  />
                </div>
              </div>
            )}

            {formData.type === 'ACCOUNT_BALANCE_LIMIT' && (
              <>
                <div className='mb-2 flex w-full flex-row'>
                  <div className='w-full px-3'>
                    <Input
                      required
                      inputType='text'
                      placeholder='LIMIT'
                      name='limit'
                      onChange={(e) =>
                        handleInputChange(e, setFormData, formData)
                      }
                    />
                  </div>
                </div>
                <div className='mb-2 flex w-full flex-row'>
                  <div className='w-full px-3'>
                    <label className='font-semibold text-gray-400'>
                      TYPE OF BALANCE <span className='text-[red]'>*</span>
                      <Select
                        options={[
                          { value: 'account', label: 'account' },
                          { value: 'available', label: 'available' },
                        ]}
                        value={{
                          value: formData.typeOfBalance,
                          label: formData.typeOfBalance,
                        }}
                        onChange={(e) => {
                          if (e?.value)
                            setFormData({
                              ...formData,
                              typeOfBalance: e.value,
                            });
                        }}
                      />
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button isLoading={createLoading} type='submit'>
                Create subscription
              </Button>
            </div>
          </form>

          <ResponseBox>{createResponse}</ResponseBox>
        </div>

        <div className='layout mb-8 mt-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>HMAC Secret Digest</h4>
          <form
            onSubmit={(e) => enableHmac(e)}
            className='mt-2 flex w-full flex-wrap rounded-tl-md rounded-tr-md bg-neutral-100 pt-4 pb-3'
          >
            <div className='mb-2 flex w-full flex-row'>
              <div className='w-full px-3'>
                <label className='font-semibold text-gray-400'>
                  <Input
                    required
                    inputType='text'
                    placeholder='HMAC SECRET'
                    name='hmacSecret'
                    onChange={(e) =>
                      handleInputChange(e, setFormData, formData)
                    }
                  />
                </label>
              </div>
            </div>

            <div className='flex w-full flex-row items-center justify-start px-3'>
              <Button isLoading={hmacLoading} type='submit'>
                Enable HMAC
              </Button>
              <Button
                onClick={() => disableHmac()}
                variant='outline'
                className='ml-2'
              >
                Disable HMAC
              </Button>
            </div>
          </form>

          <ResponseBox>{createResponse}</ResponseBox>
        </div>

        <div className='layout mb-8 mt-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>List all active subscriptions</h4>

          <Table
            onFetch={getSubscriptions}
            columns={subscriptionsColumns}
            data={subscriptions}
          />
        </div>

        <div className='layout mb-8 mt-8 flex flex-col items-baseline justify-start text-left text-black'>
          <h4>List all executed webhooks</h4>

          <Table
            onFetch={getWebhooks}
            columns={webhookColumns}
            data={webhooks}
          />
        </div>
      </main>
    </Layout>
  );
}
