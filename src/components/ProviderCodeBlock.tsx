import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface ProviderCodeBlockProps {
  language?: string;
  children: string;
  showForProvider?: string;
}

export default function ProviderCodeBlock({ language = 'yaml', children, showForProvider }: ProviderCodeBlockProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as any;
  const currentProvider = customFields?.defaultProvider || 'azure';
  const providers = customFields?.providers || {};
  
  // If showForProvider is specified, only show for that provider
  if (showForProvider && showForProvider !== currentProvider) {
    return null;
  }
  
  // Replace provider variables in the code
  let processedCode = children;
  
  // Match patterns like {{nodeClassApi}} or {{nodeClassName}}
  const variablePattern = /\{\{(\w+)\}\}/g;
  
  processedCode = processedCode.replace(variablePattern, (match, varName) => {
    const value = providers[currentProvider]?.[varName];
    return value || match;
  });
  
  // Handle provider-specific sections
  // Remove sections marked for other providers
  const providerSectionPattern = /# PROVIDER:(\w+):START[\s\S]*?# PROVIDER:\1:END/g;
  processedCode = processedCode.replace(providerSectionPattern, (match, provider) => {
    if (provider === currentProvider) {
      // Keep the content but remove the markers
      return match
        .replace(/# PROVIDER:\w+:START\n?/, '')
        .replace(/# PROVIDER:\w+:END\n?/, '');
    }
    // Remove content for other providers
    return '';
  });
  
  // Replace provider-specific values in the requirements
  if (currentProvider === 'azure') {
    processedCode = processedCode
      .replace(/karpenter\.k8s\.aws\/instance-category/g, 'karpenter.azure.com/sku-family')
      .replace(/karpenter\.k8s\.aws\/instance-family/g, 'karpenter.azure.com/sku-name')
      .replace(/karpenter\.k8s\.aws\/instance-generation/g, 'karpenter.azure.com/sku-version')
      .replace(/\["c", "m", "r"\]/g, '["D", "E", "F"]')
      .replace(/\["m5","m5d","c5","c5d","c4","r4"\]/g, '["Standard_D2s_v3", "Standard_D4s_v3", "Standard_E2s_v3"]')
      .replace(/\["nitro"\]/g, '["v3", "v4", "v5"]')
      .replace(/us-west-2a/g, 'eastus-1')
      .replace(/us-west-2b/g, 'eastus-2');
  }
  
  return <CodeBlock language={language}>{processedCode}</CodeBlock>;
}