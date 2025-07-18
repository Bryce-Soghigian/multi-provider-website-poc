import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { useProvider } from '@site/src/contexts/ProviderContext';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const { currentProvider, providers } = useProvider();
  
  const providerInfo = providers[currentProvider] || { name: 'Any Cloud' };
  
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Karpenter
        </Heading>
        <p className="hero__subtitle">Just-in-time Nodes for Any Kubernetes Cluster</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/quickstart">
            Get Started with {providerInfo.name}
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/intro">
            Learn More
          </Link>
        </div>
      </div>
    </header>
  );
}

function HowItWorksSection() {
  return (
    <section className="padding-vert--xl">
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center margin-bottom--lg">
            <Heading as="h2" className="margin-bottom--lg">
              How It Works
            </Heading>
            <img 
              src="/img/karpenter-overview.png" 
              alt="Karpenter Overview"
              className="margin-bottom--lg"
              style={{ maxWidth: '80%', height: 'auto' }}
            />
            <p className="lead">
              Karpenter observes the aggregate resource requests of unscheduled pods and makes decisions to launch and terminate nodes to minimize scheduling latencies and infrastructure cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureSection() {
  const { currentProvider } = useProvider();
  
  const features = [
    {
      title: 'Improve Application Availability',
      icon: '🌐',
      description: 'Karpenter responds quickly and automatically to changes in application load, scheduling, and resource requirements, placing new workloads onto a variety of available compute resource capacity.'
    },
    {
      title: 'Lower Compute Costs',
      icon: '💰',
      description: 'Karpenter lowers cluster compute costs by looking for opportunities to remove under-utilized nodes, replace expensive nodes with cheaper alternatives, and consolidate workloads onto more efficient compute resources.'
    },
    {
      title: 'Minimize Operational Overhead',
      icon: '🔧',
      description: 'Karpenter comes with a set of opinionated defaults in a single, declarative NodePool resource which can easily be customized. No additional configuration required!'
    }
  ];

  return (
    <section className="padding-vert--xl" style={{ backgroundColor: 'var(--ifm-color-primary)' }}>
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <div className="text--center padding-horiz--md" style={{ color: 'white' }}>
                <div className="margin-bottom--md" style={{ fontSize: '3rem' }}>
                  {feature.icon}
                </div>
                <Heading as="h3" className="margin-bottom--md" style={{ color: 'white' }}>
                  {feature.title}
                </Heading>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenSourceSection() {
  const { currentProvider } = useProvider();
  
  const getGitHubUrl = () => {
    switch (currentProvider) {
      case 'aws':
        return 'https://github.com/aws/karpenter-provider-aws';
      case 'azure':
        return 'https://github.com/Azure/karpenter-provider-azure';
      default:
        return 'https://github.com/kubernetes-sigs/karpenter';
    }
  };

  return (
    <section className="padding-vert--xl">
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <Heading as="h2" className="margin-bottom--lg">
              Karpenter is Open Source Software
            </Heading>
            <p className="lead margin-bottom--lg">
              Karpenter is licensed under the permissive <a href="https://github.com/kubernetes-sigs/karpenter/blob/main/LICENSE">Apache License 2.0</a>.
              It is designed to work with any Kubernetes cluster running in any environment, including all major cloud providers and on-premises environments.
            </p>
            <p className="lead margin-bottom--lg">
              Have an idea for a feature or found something that could work better?
              Create a GitHub issue and tell us about it.
            </p>
            <div className="margin-top--lg">
              <Link
                className="button button--primary button--lg margin-right--md"
                to={getGitHubUrl()}>
                <span style={{ marginRight: '8px' }}>⭐</span>
                Get Involved on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MultiProviderCallout() {
  const { currentProvider, setProvider, providers } = useProvider();
  
  return (
    <section className="padding-vert--xl" style={{ backgroundColor: 'var(--ifm-color-emphasis-100)' }}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <Heading as="h2" className="margin-bottom--lg">
              Multi-Cloud Support
            </Heading>
            <p className="lead margin-bottom--lg">
              This documentation supports multiple cloud providers. Choose your platform to get started:
            </p>
            <div className="row margin-top--lg">
              {Object.entries(providers).map(([key, provider]: [string, any]) => (
                <div key={key} className="col col--6 margin-bottom--md">
                  <div 
                    className={clsx(
                      'card',
                      'card--full-height',
                      'text--center',
                      'padding--lg',
                      currentProvider === key && 'card--primary'
                    )}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setProvider(key)}
                  >
                    <div className="card__header">
                      <i className={`${provider.icon} fa-3x`} style={{ color: provider.color }}></i>
                      <Heading as="h3" className="margin-top--md">
                        {provider.name}
                      </Heading>
                    </div>
                    <div className="card__body">
                      <p>
                        {key === 'aws' && 'Amazon EKS with EC2 instances'}
                        {key === 'azure' && 'Azure AKS with Azure VMs'}
                      </p>
                      {currentProvider === key && (
                        <div className="margin-top--md">
                          <Link
                            className="button button--primary"
                            to="/docs/getting-started/quickstart">
                            Get Started
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Just-in-time Nodes for Any Kubernetes Cluster"
      description="Karpenter simplifies Kubernetes infrastructure with the right nodes at the right time. Automatically launch just the right compute resources to handle your cluster's applications.">
      <HomepageHeader />
      <main>
        <div className="padding-vert--lg" style={{ backgroundColor: 'var(--ifm-color-emphasis-100)' }}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2 text--center">
                <Heading as="h2" className="margin-bottom--lg">
                  Karpenter simplifies Kubernetes infrastructure with the right nodes at the right time.
                </Heading>
                <p className="lead">
                  Karpenter automatically launches just the right compute resources to handle your cluster's applications. 
                  It is designed to let you take full advantage of the cloud with fast and simple compute provisioning for Kubernetes clusters.
                </p>
              </div>
            </div>
          </div>
        </div>
        <FeatureSection />
        <HowItWorksSection />
        <MultiProviderCallout />
        <OpenSourceSection />
      </main>
    </Layout>
  );
}