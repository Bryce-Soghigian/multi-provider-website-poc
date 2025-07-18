import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import styles from './styles.module.css';
import { useProvider } from '@site/src/contexts/ProviderContext';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as any[];
}

function NavbarItems({items}: {items: any[]}) {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

// Custom provider dropdown component with Docusaurus styling
function ProviderDropdown() {
  try {
    const { currentProvider, setProvider, providers } = useProvider();

    if (!providers || Object.keys(providers).length === 0) {
      return null;
    }

    const currentProviderInfo = providers[currentProvider];

    return (
      <div className="navbar__item dropdown dropdown--hoverable dropdown--right provider-dropdown">
        <a
          className="navbar__link"
          aria-haspopup="true"
          aria-expanded="false"
          role="button"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <span style={{ marginRight: '8px' }}>
            <i className={currentProviderInfo?.icon} style={{ color: currentProviderInfo?.color }}></i>
          </span>
          {currentProviderInfo?.name || 'Provider'}
        </a>
        <ul className="dropdown__menu">
          {Object.entries(providers).map(([key, provider]: [string, any]) => (
            <li key={key}>
              <a
                className={`dropdown__link ${key === currentProvider ? 'dropdown__link--active' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setProvider(key);
                }}
              >
                <span style={{ marginRight: '8px' }}>
                  <i className={provider.icon} style={{ color: provider.color }}></i>
                </span>
                {provider.name}
                {key === currentProvider && (
                  <span style={{ marginLeft: '8px', opacity: 0.7 }}>✓</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Error in ProviderDropdown:', error);
    return null;
  }
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
          <ProviderDropdown />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}