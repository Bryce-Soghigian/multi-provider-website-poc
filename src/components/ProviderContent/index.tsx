import React from 'react';
import { useProvider } from '@site/src/contexts/ProviderContext';

interface ProviderContentProps {
  providers: string;
  children: React.ReactNode;
}

const ProviderContent: React.FC<ProviderContentProps> = ({ providers, children }) => {
  const { currentProvider } = useProvider();
  
  const providerList = providers.split(',').map(p => p.trim());
  const shouldShow = providerList.includes(currentProvider);

  return shouldShow ? <>{children}</> : null;
};

export default ProviderContent;