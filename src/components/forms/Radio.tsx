import React, { useState } from 'react';

import clsxm from '@/lib/clsxm';

import Button from '../buttons/Button';

interface radioValue {
  name: string;
}

type RadioProps = {
  className?: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  values: radioValue[];
  defaultValue?: string;
};

export default function Radio({
  className,
  handleClick,
  defaultValue,
  values,
  ...rest
}: RadioProps): JSX.Element {
  const [selected, setSelected] = useState<string>(defaultValue ?? '');

  return (
    <div className={clsxm('flex flex-row gap-2', className)} {...rest}>
      {values.map((value, i) => {
        return (
          <Button
            key={i}
            onClick={(e) => {
              setSelected(value.name);
              handleClick(e);
            }}
            className={selected === value.name ? 'border-primary-400' : ''}
            variant='radio'
          >
            {value.name}
          </Button>
        );
      })}
    </div>
  );
}
