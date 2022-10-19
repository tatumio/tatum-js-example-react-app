import * as React from 'react';
import {
  FaArrowsAltH,
  FaHome,
  FaImage,
  FaUserAlt,
  FaWallet,
} from 'react-icons/fa';

import SideBarLink from '../links/SideBarLink';

export default function Sidebar(): JSX.Element {
  return (
    <div className='primaryGradient w-full border-b-[1px] border-r-[1px] border-neutral-400 md:sticky md:bottom-0 md:h-[calc(100vh-81px)] md:w-[160px] md:border-b-0'>
      <nav className='flex w-full flex-row items-stretch justify-evenly md:w-auto md:flex-none md:flex-col'>
        <SideBarLink className='flex items-center justify-center' href='/'>
          <FaHome className='mr-2' />
          Home
        </SideBarLink>
        <SideBarLink
          className='flex items-center justify-center'
          href='/wallet'
        >
          <FaWallet className='mr-2' />
          Wallet
        </SideBarLink>
        <SideBarLink className='flex items-center justify-center' href='/nft'>
          <FaImage className='mr-2' />
          NFT
        </SideBarLink>
        <SideBarLink
          className='flex items-center justify-center'
          href='/webhook'
        >
          <FaArrowsAltH className='mr-2' />
          Webhooks
        </SideBarLink>
        <SideBarLink
          className='flex items-center justify-center'
          href='/account'
        >
          <FaUserAlt className='mr-2' />
          Account
        </SideBarLink>
      </nav>
    </div>
  );
}
