import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation, useHistory } from '@docusaurus/router';

export default function ProviderSwitcher(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const history = useHistory();
  const customFields = siteConfig.customFields as any;
  const currentProvider = customFields?.defaultProvider || 'azure';
  const providers = customFields?.providers || {};

  const handleProviderChange = (provider: string) => {
    // In a real implementation, this would update the context/state
    // For now, we'll just reload with a query parameter
    const newUrl = `${location.pathname}?provider=${provider}`;
    history.push(newUrl);
    window.location.reload();
  };

  return (
    <div className="navbar__item dropdown dropdown--hoverable">
      <span className="navbar__link">
        {providers[currentProvider]?.name || 'Azure'}
      </span>
      <ul className="dropdown__menu">
        {Object.entries(providers).map(([key, provider]: [string, any]) => (
          <li key={key}>
            <a
              className={`dropdown__link ${key === currentProvider ? 'dropdown__link--active' : ''}`}
              onClick={() => handleProviderChange(key)}
              href="#"
            >
              {provider.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}