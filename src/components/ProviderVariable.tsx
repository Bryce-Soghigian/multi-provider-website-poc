import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface ProviderVariableProps {
  path: string;
  fallback?: string;
}

export default function ProviderVariable({ path, fallback }: ProviderVariableProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as any;
  const currentProvider = customFields?.defaultProvider || 'azure';
  const providers = customFields?.providers || {};
  
  // Navigate through the path to get the value
  const pathParts = path.split('.');
  let value = providers[currentProvider];
  
  for (const part of pathParts) {
    if (value && typeof value === 'object') {
      value = value[part];
    } else {
      value = undefined;
      break;
    }
  }
  
  // Use fallback if value is not found
  const displayValue = value || fallback || `{${path}}`;
  
  return <>{displayValue}</>;
}