import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ProviderSwitcher: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const [currentProvider, setCurrentProvider] = useState<string>('azure');

  useEffect(() => {
    // Get current provider from localStorage or default
    const savedProvider = localStorage.getItem('karpenter-provider') || 'azure';
    setCurrentProvider(savedProvider);

    // Set initial provider on body
    document.body.setAttribute('data-provider', savedProvider);
  }, []);

  const handleProviderChange = (provider: string) => {
    setCurrentProvider(provider);
    localStorage.setItem('karpenter-provider', provider);
    document.body.setAttribute('data-provider', provider);
    
    // Dispatch custom event for other components to listen to
    const event = new CustomEvent('provider-changed', {
      detail: { provider }
    });
    window.dispatchEvent(event);
  };

  const providers = siteConfig.customFields?.providers as any;
  
  if (!providers) {
    return null;
  }

  return (
    <div className="provider-switcher">
      <div className="dropdown">
        <button 
          className="btn btn-secondary dropdown-toggle" 
          type="button" 
          id="providerDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i className={providers[currentProvider]?.icon}></i> {providers[currentProvider]?.name}
        </button>
        <ul className="dropdown-menu" aria-labelledby="providerDropdown">
          {Object.entries(providers).map(([key, provider]: [string, any]) => (
            <li key={key}>
              <button 
                className={`dropdown-item ${key === currentProvider ? 'active' : ''}`}
                onClick={() => handleProviderChange(key)}
              >
                <i className={provider.icon}></i> {provider.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProviderSwitcher;