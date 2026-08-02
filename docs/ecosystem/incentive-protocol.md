---
id: incentive-protocol
title: Incentive Protocol
description: Project markets, emissions, liquidity, and public-goods mechanisms in the MINI ecosystem incentive protocol.
slug: /incentive-protocol
sidebar_position: 1
---

# Incentive Protocol

The Incentive Protocol is ecosystem incentive infrastructure built around MINI.

It creates independent markets for ecosystem projects, allowing users to express support by holding, staking, and trading project assets. MINI is then distributed according to market performance, providing projects with liquidity, builder revenue, and long-term incentives.

## Infrastructure for Ecosystem Incentives

MINI carries value flows across JAM ecosystem bootstrapping, Polkadot ecosystem incentives, and MiniJAM ecosystem development. That value eventually needs to reach concrete building activity, including:

- network and infrastructure development;
- user-facing products and applications;
- developer tools and public services;
- liquidity and market building;
- real user participation and usage;
- public goods that cannot be sustained through commercial revenue.

Traditional ecosystem incentives are usually delivered through grants, committee approvals, or one-time distributions. They have helped ecosystems grow at certain stages, but their drawbacks are also clear. Builders end up facing committees or governance mechanisms rather than users. Even binary grant systems aimed at community governance cannot express the diversity of market preferences. The end result can be adverse selection.

The Incentive Protocol provides another path:

```text
Builders create a project
        v
The project establishes a public market
        v
Users buy, hold, and stake Alpha
        v
The market forms price and liquidity
        v
MINI flows into the project based on market results
        v
Builders, users, and public goods receive incentives
```

In this structure, users express judgment through real capital and market behavior, while builders can face users directly to obtain launch resources and long-term revenue. Over time, we want this protocol to become a regular capital market for early-stage innovative projects.

## Incentive Protocol

The Incentive Protocol creates an independent **Alpha market** for each project. Alpha is the project market asset. It represents user support for the project and is also used to establish liquidity, participate in staking, distribute project rewards, and generate public-goods voting power.

The basic mechanism has five parts:

```text
Create a project market
      v
Hold and stake Alpha
      v
Emit according to market performance
      v
Users or the project can exit
      v
Allocate part of the influence to public goods
```

### Create a Project Market

Each project first creates its own Alpha. After Alpha Genesis is complete, the project enters the market launch stage:

1. The launch controller supplies a certain amount of vMINI.
2. The protocol releases Alpha reserved for liquidity.
3. vMINI and Alpha jointly establish a liquidity pool.
4. Users can buy or sell Alpha, or provide additional liquidity to the market.

### Stake and Support Projects

Users can buy and hold a project's Alpha, and can also stake Alpha into that project's Staking Vault. Staking means the user is willing to take project-related market risk for a period of time and align their interest with the project's long-term development. Stakers receive protocol-minted **Alpha**.

### Emit According to Market Performance

The Incentive Protocol allocates an emissions budget to projects by Epoch. The allocation ratio depends on each project's market performance. In simple terms, it uses the previous Epoch's price EMA and applies a price cap.

Emitted MINI is distributed in three ways:

- **Increase market liquidity**: the protocol injects the project's vMINI into the liquidity pool and mints matching Alpha according to the pool's current reserve ratio. vMINI and Alpha are added at the current price ratio, keeping the pool price as continuous as possible while liquidity increases.
- **Allocate Owner Alpha**: the protocol mints Alpha according to a preconfigured ratio and sends it to the project's Owner emissions recipient. This lets the project owner or core builders share the long-term value created by project growth.
- **Reward Alpha stakers**: another portion of Alpha is sent to the project's Staking Vault and distributed to stakers according to effective stake.

### Support Public Goods

Some ecosystem contributions cannot earn revenue by issuing an independent Alpha or creating a commercial market, including:

- open-source tools;
- public RPC;
- education and documentation;
- community infrastructure;
- shared developer components;
- other public services.

The Incentive Protocol allows Alpha stakers to allocate the influence they have formed to public goods. Current public-goods voting power depends on:

- the user's effective Alpha stake in a project;
- that project's Alpha price EMA in the previous Epoch.

Users can allocate voting power across different public goods. Public goods share the current public-goods vMINI emissions according to their share of total voting power.

## Subprotocols

The basic mechanism above lets a project that already has Alpha and initial liquidity enter the market and receive ongoing emissions. For very early-stage projects, however, establishing the initial market is itself difficult.

Different projects also fit different mechanisms. Some fit bonding curves, some fit auctions; some need to incentivize users according to product usage, some need to release funds according to builder milestones; some want most fees to remain with the building team, while others want to keep rewarding users and public goods.

The Incentive Protocol is not actually the direct user-facing layer for projects and users, and we do not even plan to build a frontend for it. The user-facing layer is the subprotocol. It decides how projects enter incentive markets and how launch, liquidity, emissions, and Owner rights are allocated. Subprotocols can therefore implement many mechanisms flexibly and efficiently, such as:

- strict human review;
- AI-based result acceptance;
- validator and Worker networks.

### Market Launch

Market launch brings an early-stage project into the Alpha/MINI market. A subprotocol can decide:

- how users participate;
- how Alpha is issued and distributed;
- how the project obtains launch funding;
- what conditions define a successful launch;
- how refunds work after a failed launch;
- how much MINI and Alpha are used to establish liquidity;
- how the initial price and LP shares are determined.

After a project completes its launch, the subprotocol hands the prepared MINI and Alpha to the Incentive Protocol, which creates and runs the liquidity market. Different subprotocols may use bonding curves, fixed prices, auctions, crowdfunding, or other launch methods.

### Emissions

Subprotocols can define how MINI and Alpha continue to be distributed, including:

- allocations to builders, users, or liquidity providers;
- calculations based on market price, product usage, or building results;
- how long emissions last;
- when emissions are reduced, paused, or stopped.

The Incentive Protocol executes budgets and settlement. Subprotocols define the concrete rules.

### Owner Share

Owner share defines the long-term interest of the project owner or core builders.

A subprotocol can decide:

- how much launch funding the Owner receives;
- how much Alpha the Owner receives;
- whether the Owner shares ongoing emissions and trading fees;
- whether vesting periods or building milestones apply;
- how Owner rights are handled when the project exits.

Through Owner share, builders can receive both early development resources and revenue generated by the project's long-term operation.
