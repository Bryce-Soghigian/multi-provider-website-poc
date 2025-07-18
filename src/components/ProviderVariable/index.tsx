import React from 'react';
import { useProvider } from '@site/src/contexts/ProviderContext';

interface ProviderVariableProps {
  path: string;
  fallback?: string;
}

const ProviderVariable: React.FC<ProviderVariableProps> = ({ path, fallback = '' }) => {
  const { currentProvider, providers } = useProvider();
  
  const provider = providers?.[currentProvider];
  
  if (!provider) {
    return <>{fallback}</>;
  }

  const pathParts = path.split('.');
  let value = provider;
  
  for (const part of pathParts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return <>{fallback}</>;
    }
  }

  return <>{value}</>;
};

export default ProviderVariable;