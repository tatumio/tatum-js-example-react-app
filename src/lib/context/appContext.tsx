import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { Chains } from '../consts/sdk';

export type Context = {
  selectedChain: Chains;
  setSelectedChain: Dispatch<SetStateAction<Chains>>;
};

const TatumAppContext = createContext<Context>({
  selectedChain: Chains.Ethereum,
  setSelectedChain: () => null,
});

export const AppContextProvider: FC<{
  children: ReactNode;
}> = (props) => {
  const [selectedChain, setSelectedChain] = useState<Chains>(Chains.Ethereum);

  return (
    <TatumAppContext.Provider
      value={{
        selectedChain,
        setSelectedChain,
      }}
      {...props}
    />
  );
};

export const useSelectedChain = () => {
  const context = useContext(TatumAppContext);

  if (!context)
    throw new Error(
      'getSelectedChain must be called inside AppContextProvider'
    );

  return context;
};
