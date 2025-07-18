# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-provider documentation website built with Docusaurus 3.8.1 for Karpenter, specifically designed to support multiple cloud providers (Azure and AWS) with dynamic content switching. It demonstrates a proof-of-concept for provider-specific documentation that can be toggled by users.

## Development Commands

### Setup and Development
```bash
# Install dependencies (uses npm, not yarn despite README)
npm install

# Start development server
npm run start
# or: npm run docusaurus start

# Build for production
npm run build
# or: npm run docusaurus build

# Type checking
npm run typecheck

# Serve built site locally
npm run serve

# Clear build cache
npm run clear
```

### Deployment
```bash
# Deploy with SSH
USE_SSH=true npm run deploy

# Deploy with HTTPS
GIT_USER=<username> npm run deploy
```

## Architecture

### Multi-Provider System
The core architecture centers around a provider context system that enables dynamic content switching:

- **ProviderContext** (`src/contexts/ProviderContext.tsx`): React context that manages the current provider state, persists selection to localStorage, and provides provider data from Docusaurus config
- **Provider Configuration**: Defined in `docusaurus.config.ts` under `customFields.providers` with provider-specific metadata (node class names, API versions, instance types, etc.)
- **Dynamic Components**: Components like `ProviderVariable`, `ProviderCodeBlock`, and `ProviderContent` render different content based on the selected provider

### Key Components
- **ProviderSwitcher** (`src/components/ProviderSwitcher.tsx`): Navbar dropdown for switching between providers
- **ProviderVariable** (`src/components/ProviderVariable/`): Renders provider-specific values inline
- **ProviderContent** (`src/components/ProviderContent/`): Shows/hides content blocks based on provider
- **Custom Navbar** (`src/theme/Navbar/`): Swizzled Docusaurus navbar with provider switcher integration

### Provider Data Structure
Each provider in `docusaurus.config.ts` includes:
- Basic info (name, icon, color)
- Kubernetes-specific data (nodeClassName, nodeClassApi)
- Cloud-specific data (instanceTypes, zones, instanceLabels)
- Repository links

### State Management
- Provider state is managed through React Context
- Current selection persists to localStorage with key `karpenter-provider`
- Body data attribute `data-provider` enables CSS-based styling
- Custom events (`provider-changed`) support legacy listeners

### File Structure
- `src/contexts/`: React contexts for global state
- `src/components/`: Reusable React components
- `src/theme/`: Docusaurus theme customizations (swizzled components)
- `src/hooks/`: Custom React hooks
- `docs/`: MDX documentation content organized by feature/concept