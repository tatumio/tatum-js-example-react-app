import SubMenuLink from '@/components/links/SubMenuLink';

export default function WalletSubMenu(): JSX.Element {
  return (
    <div className='-m-8 mb-8 border-b-[1px] border-neutral-400 bg-neutral-100'>
      <nav className='flex w-full flex-row md:w-auto'>
        <SubMenuLink href='/wallet/generate'>Generate</SubMenuLink>
        <SubMenuLink href='/wallet/info'>Info</SubMenuLink>
        <SubMenuLink href='/wallet/transactions'>Transactions</SubMenuLink>
      </nav>
    </div>
  );
}
