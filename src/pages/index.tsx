import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

const products = [
  {name: 'MiniJAM', description: translate({message: 'A JAM-inspired execution environment for building and testing services before the full JAM network is available.'}), status: 'Active', to: '/docs/minijam'},
  {name: 'Incentive Protocol', description: translate({message: 'A protocol for funding, launching, and incentivizing open projects.'}), status: 'Planned', to: '/docs/incentive-protocol'},
  {name: 'MINI', description: translate({message: 'The economic system covering the Genesis Pool, MINI Lucky, and the MiniJAM ecosystem.'}), status: 'Planned', to: '/docs/mini'},
];

export default function Home(): React.ReactElement {
  return <Layout title="MiniJAM Documentation" description="Documentation for the MiniJAM ecosystem.">
    <main>
      <header className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>MiniJAM</p>
          <h1><Translate>Documentation for the MiniJAM ecosystem</Translate></h1>
          <p><Translate>Build, run, and understand MiniJAM.</Translate></p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs"><Translate>Read the docs</Translate></Link>
            <Link className="button button--secondary button--lg" to="/docs/minijam"><Translate>View MiniJAM</Translate></Link>
          </div>
        </div>
      </header>
      <section className={clsx('container', styles.products)}>
        <div className={styles.grid}>{products.map((product) => <Link className={styles.card} to={product.to} key={product.name}>
          <div className={styles.cardHeader}><h2>{product.name}</h2><span className={clsx(styles.status, product.status === 'Active' ? styles.active : styles.planned)}>{product.status === 'Active' ? <Translate>Active</Translate> : <Translate>Planned</Translate>}</span></div>
          <p>{product.description}</p><span className={styles.arrow}>→</span>
        </Link>)}</div>
      </section>
    </main>
  </Layout>;
}
