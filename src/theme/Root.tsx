import React from 'react';
import { ProviderProvider } from '@site/src/contexts/ProviderContext';

// This component wraps the entire Docusaurus app
export default function Root({children}) {
  return <ProviderProvider>{children}</ProviderProvider>;
}