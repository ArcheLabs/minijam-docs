import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

const buildProducts = [
  {name: translate({message: 'MiniJAM'}), description: translate({message: 'Run and test JAM-style Services on the MiniJAM network.'}), to: '/docs/minijam'},
  {name: translate({message: 'JamScript'}), description: translate({message: 'Build JAM Services with a deterministic TypeScript-based language.'}), to: '/docs/jamscript'},
];

const ecosystemProducts = [
  {name: translate({message: 'Incentive Protocol'}), description: translate({message: 'Explore proposed markets and public-goods incentives.'}), to: '/docs/incentive-protocol'},
  {name: translate({message: 'MINI'}), description: translate({message: 'Read about allocation, liquidity, and network economics.'}), to: '/docs/ecosystem/tokenomics'},
];

export default function Home(): React.ReactElement {
  return <Layout title={translate({message: 'Build on JAM'})} description={translate({message: 'Documentation for MiniJAM, JamScript, and the MiniJAM ecosystem.'})}>
    <main>
      <header className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}><Translate>MiniJAM Developer Documentation</Translate></p>
          <h1><Translate>Build on JAM</Translate></h1>
          <p><Translate>Build, run, and understand JAM Services with MiniJAM and JamScript.</Translate></p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/jamscript/getting-started/quickstart"><Translate>Get started</Translate></Link>
            <Link className="button button--secondary button--lg" to="/docs/minijam"><Translate>Explore MiniJAM</Translate></Link>
          </div>
        </div>
      </header>
      <section className={clsx('container', styles.products)}>
        <h2 className={styles.sectionTitle}><Translate>Build</Translate></h2>
        <div className={styles.grid}>{buildProducts.map((product) => <Link className={styles.card} to={product.to} key={product.name}>
          <div className={styles.cardHeader}><h3>{product.name}</h3></div>
          <p>{product.description}</p><span className={styles.arrow}>-&gt;</span>
        </Link>)}</div>
        <h2 className={styles.sectionTitle}><Translate>Ecosystem</Translate></h2>
        <div className={clsx(styles.grid, styles.ecosystemGrid)}>{ecosystemProducts.map((product) => <Link className={clsx(styles.card, styles.ecosystemCard)} to={product.to} key={product.name}>
          <div className={styles.cardHeader}><h3>{product.name}</h3></div>
          <p>{product.description}</p><span className={styles.arrow}>-&gt;</span>
        </Link>)}</div>
      </section>
    </main>
  </Layout>;
}
