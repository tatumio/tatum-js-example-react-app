import React from 'react';

import { Chains } from '@/lib/consts/sdk';
import { useSelectedChain } from '@/lib/context/appContext';

import UnstyledLink from '@/components/links/UnstyledLink';

import Radio from '../forms/Radio';
import Logo from '../../../public/svg/Logo.svg';

export default function Header(): JSX.Element {
  const { selectedChain, setSelectedChain } = useSelectedChain();

  return (
    <header className='primaryGradient sticky top-0 z-30'>
      <div className='layout flex h-14 items-center justify-between border-b-[1px] border-neutral-400 px-6 py-10'>
        <UnstyledLink href='/' className='h-[40px] w-[100px] text-center'>
          <Logo className='h-full w-full' />
        </UnstyledLink>
        <nav className='flex flex-row gap-6'>
          <Radio
            values={[
              { name: 'ETH' },
              { name: 'MATIC' },
              { name: 'BTC' },
              { name: 'SOL' },
              { name: 'TRON' },
            ]}
            handleClick={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              const chain = (e.target as HTMLButtonElement).innerHTML;
              setSelectedChain(chain as Chains);
            }}
            defaultValue={selectedChain}
          />
        </nav>
      </div>
    </header>
  );
}
