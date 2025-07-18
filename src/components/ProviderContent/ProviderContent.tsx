import React from 'react';
import { useProvider } from '../../contexts/ProviderContext';

interface ProviderContentProps {
  providers: string | string[];
  children: React.ReactNode;
}

export const ProviderContent: React.FC<ProviderContentProps> = ({ providers, children }) => {
  const { currentProvider } = useProvider();
  
  const providerList = Array.isArray(providers) 
    ? providers 
    : providers.split(',').map(p => p.trim());
  
  if (!providerList.includes(currentProvider)) {
    return null;
  }
  
  return <>{children}</>;
};

export default ProviderContent;