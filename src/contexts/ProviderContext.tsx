import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface ProviderContextType {
  currentProvider: string;
  setProvider: (provider: string) => void;
  providers: Record<string, any>;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export const useProvider = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error('useProvider must be used within a ProviderProvider');
  }
  return context;
};

interface ProviderProviderProps {
  children: ReactNode;
}

export const ProviderProvider: React.FC<ProviderProviderProps> = ({ children }) => {
  const { siteConfig } = useDocusaurusContext();
  const providers = siteConfig.customFields?.providers as Record<string, any> || {};
  const defaultProvider = (siteConfig.customFields?.defaultProvider as string) || 'azure';
  
  const [currentProvider, setCurrentProvider] = useState<string>(defaultProvider);

  useEffect(() => {
    // Initialize from localStorage
    const savedProvider = localStorage.getItem('karpenter-provider');
    if (savedProvider && providers[savedProvider]) {
      setCurrentProvider(savedProvider);
      document.body.setAttribute('data-provider', savedProvider);
    } else {
      document.body.setAttribute('data-provider', defaultProvider);
    }
  }, []);

  const setProvider = (provider: string) => {
    if (providers[provider]) {
      setCurrentProvider(provider);
      localStorage.setItem('karpenter-provider', provider);
      document.body.setAttribute('data-provider', provider);
      
      // Dispatch custom event for any legacy listeners
      const event = new CustomEvent('provider-changed', {
        detail: { provider }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <ProviderContext.Provider value={{ currentProvider, setProvider, providers }}>
      {children}
    </ProviderContext.Provider>
  );
};