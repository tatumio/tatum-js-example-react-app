import React, { Dispatch } from 'react';

// eslint-disable-next-line
export const handleInputChange = (
  e: React.FormEvent<HTMLInputElement>,
  hook: Dispatch<any>,
  data: any
) => {
  hook({ ...data, [e.target.name]: (e.target as HTMLInputElement).value });
};
