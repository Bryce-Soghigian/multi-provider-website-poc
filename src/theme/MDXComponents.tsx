import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import ProviderContent from '@site/src/components/ProviderContent';
import ProviderVariable from '@site/src/components/ProviderVariable';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Add custom components
  ProviderContent,
  ProviderVariable,
};