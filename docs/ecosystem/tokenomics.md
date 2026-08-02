---
id: tokenomics
title: MINI Tokenomics
description: MINI initial allocation, market launch, liquidity, and incentive mechanisms.
slug: /ecosystem/tokenomics
sidebar_position: 2
---

# MINI Tokenomics

MINI is the base asset of the MiniJAM network and the Incentive Protocol. MINI's initial task is to launch the network and ecosystem, and then gradually transition into a long-term economic model maintained by network inflation, fees, and staking.

:::warning Governance Draft

This document is a draft of MINI tokenomics.

Fair distribution, MINI Lucky, and the early operations reserve will be finalized before launch. MINI holders will use governance to formally vote on the Root market launch, three-year incentive emissions, foundation budget, and long-term network economic model.

:::

MINI initial supply is allocated as follows:

| Use | Share |
| --- | --- |
| Fair distribution | 1% |
| MINI Lucky | 1% |
| Early operations reserve | 1% |
| Root market launch | About 33.55% |
| Initial liquidity | About 18.45% |
| Incentive Protocol | 35% |
| Foundation | 10% |

MINI has no founder, advisor, private-sale, or investor allocation.

## Initial Supply

The initial MINI supply is:

> **1,000,000,000 MINI**

The initial supply is used for the MINI launch, liquidity, the Incentive Protocol, and the foundation.

After the MiniJAM mainnet launches, a new inflation mechanism may be introduced according to network security needs. The concrete inflation rate and allocation method are not included in the initial tokenomics and will be decided by MINI holders through governance.

## Fair Distribution

Accumulating liquidity through a bonding curve is a common launch mechanism, but early participants gain too much advantage, which is not appropriate for MINI. Bonding curves also usually have specific market-cap graduation thresholds. Without early price discovery, this can create a mismatch between the liquidity pool and market participation, and can worsen market manipulation.

MINI uses an early fair distribution mechanism to ensure broader and fairer participation and to form early price discovery.

1% of the initial supply is distributed through MINI Genesis. A fixed amount of MINI is released in each block until the allocation is fully released. After participants contribute DOT, they continuously receive their corresponding share of MINI from all subsequent blocks.

After the fair distribution ends, the protocol calculates the maximum effective holding cost `(p_0)` and uses it as the starting price of the Root curve.

MINI received through fair distribution will be claimed when the liquidity pool is established.

## MINI Lucky

1% of the initial supply is allocated to MINI Lucky. MINI Lucky broadens the range of early holders so MINI is not distributed purely by contribution amount.

The concrete mechanism uses the trusted social network formed through the Polkadot App. MINI distributed through MINI Lucky will also be claimed when the liquidity pool is established.

## Early Operations Reserve

1% of the initial supply is allocated as an early operations reserve for the team to use for:

- market operations;
- community events;
- ecosystem partnerships;
- content and brand building;
- infrastructure and other launch expenses.

This MINI is not a personal allocation for team members. It is held by a public operations treasury. All usage records should remain transparent, with regular reporting to the community on balance, recipients, and purpose.

## Root Market Launch

About 33.55% of the initial supply is sold through the Root curve.

The Root curve starts from `(p_0)` formed by fair distribution and rises up to `(10p_0)`:

```text
P(q)=p_0(1+9q/Q)
```

Where:

- `(Q)` is the amount of MINI planned for sale through Root;
- `(q)` is the amount of MINI already sold;
- `(p_0)` is the starting price formed by fair distribution.

In this curve, earlier participants take higher uncertainty and therefore receive a lower price.

## Initial Liquidity

About 18.45% of the initial supply is reserved specifically to establish MINI/DOT liquidity. The DOT principal raised through the Root curve is paired with MINI from the liquidity reserve, keeping the public market's initial price consistent with the final curve price.

The initial LP is held by the protocol treasury. It is not a discretionary asset of the team or foundation and is not used for daily operating expenses.

## Incentive Protocol

35% of the initial supply is allocated to the Incentive Protocol and released over three years:

| Phase | Share of MINI total supply |
| --- | --- |
| Year 1 | 20% |
| Year 2 | 10% |
| Year 3 | 5% |
| After three years | 0% |

After three years, genesis incentive emissions stop. The Incentive Protocol will continue operating through trading fees, subprotocol fees, and other protocol revenue.

## Foundation

10% of the initial supply is allocated to the foundation for:

- protocol audits;
- legal and compliance;
- long-term infrastructure;
- security response;
- ecosystem partnerships;
- public affairs.

The foundation allocation is not personal allocation for the team.

## Long-Term Network Economic Model

After the MiniJAM mainnet launches, it will gradually move toward an independent network security economic model, including:

- validator or Worker staking;
- network fees;
- node rewards;
- slashing for malicious behavior.

This model is not included in the initial tokenomics. It needs to be decided by MINI holders through governance according to the actual progress of MiniJAM and JAM.
