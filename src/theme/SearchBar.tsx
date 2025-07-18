import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function SearchBar(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  return (
    <div className="navbar__search">
      <input
        type="search"
        placeholder="Search this site..."
        className="navbar__search-input"
        aria-label="Search"
      />
    </div>
  );
}