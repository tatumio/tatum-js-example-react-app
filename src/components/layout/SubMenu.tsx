import * as React from 'react';

import SubMenuLink from '../links/SubMenuLink';

export default function SubMenu(): JSX.Element {
  return (
    <div className='-m-8 mb-8 border-b-[1px] border-neutral-400 bg-neutral-500'>
      <nav className='flex w-full flex-row px-8 md:w-auto'>
        <SubMenuLink href='/test'>Test</SubMenuLink>
        <SubMenuLink href='/test-2'>Test 2</SubMenuLink>
      </nav>
    </div>
  );
}
