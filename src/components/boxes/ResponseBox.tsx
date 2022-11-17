import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

type BoxProps = {
  isLoading?: boolean;
} & React.ComponentPropsWithRef<'div'>;

const ResponseBox = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, isLoading, ...rest }, ref): JSX.Element => {
    return (
      <div
        ref={ref}
        className={clsxm(
          'flex max-h-28 w-full items-start overflow-y-auto break-all rounded-bl-md rounded-br-md bg-zinc-900 px-4 py-2 text-[#cacaca] transition-max-height duration-300 ease-in-out scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-200',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {children}
      </div>
    );
  }
);

export default ResponseBox;
