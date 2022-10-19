import SubMenuLink from '@/components/links/SubMenuLink';

export default function AccountSubMenu(): JSX.Element {
  return (
    <div className='-m-8 mb-8 border-b-[1px] border-neutral-400 bg-neutral-100'>
      <nav className='flex w-full flex-row md:w-auto'>
        <SubMenuLink href='/account/management'>Management</SubMenuLink>
        <SubMenuLink href='/account/burn'>Payments</SubMenuLink>
        <SubMenuLink href='/account/customers'>Customers</SubMenuLink>
        <SubMenuLink href='/account/virtual-currency'>
          Virtual Currency
        </SubMenuLink>
        <SubMenuLink href='/account/withdrawal'>Withdrawal</SubMenuLink>
        <SubMenuLink href='/account/deposit'>Deposit</SubMenuLink>
        <SubMenuLink href='/account/offchain'>Offchain</SubMenuLink>
      </nav>
    </div>
  );
}
