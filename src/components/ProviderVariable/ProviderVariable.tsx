import React from 'react';
import { useProvider } from '../../contexts/ProviderContext';

interface ProviderVariableProps {
  name: string;
}

export const ProviderVariable: React.FC<ProviderVariableProps> = ({ name }) => {
  const { currentProvider, providers } = useProvider();
  
  const value = providers[currentProvider]?.[name] || `{{${name}}}`;
  
  return <code>{value}</code>;
};

export default ProviderVariable;