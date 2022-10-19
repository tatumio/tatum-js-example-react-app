import SubMenuLink from '@/components/links/SubMenuLink';

export default function NftSubMenu(): JSX.Element {
  return (
    <div className='-m-8 mb-8 border-b-[1px] border-neutral-400 bg-neutral-100'>
      <nav className='flex w-full flex-row md:w-auto'>
        <SubMenuLink href='/nft/mint'>Minting</SubMenuLink>
        <SubMenuLink href='/nft/burn'>Burning</SubMenuLink>
        <SubMenuLink href='/nft/transfer'>Transfer</SubMenuLink>
      </nav>
    </div>
  );
}
