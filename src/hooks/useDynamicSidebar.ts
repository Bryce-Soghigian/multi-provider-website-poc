import { useProvider } from '../contexts/ProviderContext';

export const useDynamicSidebar = () => {
  const { currentProvider } = useProvider();

  const getProviderSpecificSidebar = () => {
    const baseSidebar = [
      {
        type: 'doc',
        id: 'intro',
        label: 'Introduction',
      },
      {
        type: 'category',
        label: 'Getting Started',
        items: [
          'getting-started/quickstart',
        ],
      },
      {
        type: 'category',
        label: 'Concepts',
        items: [
          'concepts/nodepools',
          'concepts/nodeclasses',
          'concepts/scheduling',
          'concepts/disruption',
        ],
      },
    ];

    // Add provider-specific sections based on current provider
    if (currentProvider === 'aws') {
      baseSidebar.push(
        {
          type: 'category',
          label: 'Tasks',
          items: [
            'aws/tasks/managing-amis',
          ],
        },
        {
          type: 'category',
          label: 'Upgrading',
          items: [
            'aws/upgrading/upgrade-guide',
          ],
        }
      );
    } else if (currentProvider === 'azure') {
      baseSidebar.push({
        type: 'category',
        label: 'Azure Specific',
        items: [
          'azure/nap-vs-self-hosted',
        ],
      });
    }

    return baseSidebar;
  };

  return {
    dynamicSidebar: getProviderSpecificSidebar(),
    currentProvider,
  };
};