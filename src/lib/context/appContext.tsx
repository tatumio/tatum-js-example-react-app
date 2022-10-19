import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type Context = {
  selectedChain: string;
  setSelectedChain: Dispatch<SetStateAction<string>>;
};

const TatumAppContext = createContext<Context>({
  selectedChain: 'ETH',
  setSelectedChain: () => null,
});

export const AppContextProvider: FC<{
  children: ReactNode;
}> = (props) => {
  const [selectedChain, setSelectedChain] = useState<string>('ETH');

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
