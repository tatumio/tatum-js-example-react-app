import React, { Dispatch } from 'react';

export const handleInputChange = (
  e: React.FormEvent<HTMLInputElement>,
  // eslint-disable-next-line
  hook: Dispatch<any>,
  // eslint-disable-next-line
  data: any
) => {
  hook({ ...data, [e.target.name]: (e.target as HTMLInputElement).value });
};
