# Encoteki — Next.js App

A modern Web3 dApp front‑end for **Encoteki**: NFTs with real‑world impact, DAO proposals, and multi‑chain experiences (Base + Lisk first‑class). Built with **Next.js 15+ (App Router)**, **TypeScript**, **Tailwind**, and **wagmi/viem**.

---

## ✨ What’s inside

- **Next.js 15+ (App Router)**
- **TypeScript**
- **wagmi + viem** for wallet & RPC
- **RainbowKit** default wallet UIs
- **Tailwind v4**
- **Feature‑based folders** (`/features/*`) and shared UI
- **Encoteki features**:
  - Mint **Encoteki NFTs** (TheSatwasBand)
  - DAO proposals & voting UX
  - Multi‑chain toggles (Base, Lisk; easy to extend)
  - AA flows (batched tx, sponsored gas) — optional
- **Quality**: ESLint, Prettier

---

## 🚀 Getting started

### Requirements

- Node 20+ recommended, **yarn** (recommended)
- RPC endpoints for Base/Lisk (Alchemy, Ankr, etc.)
- (Optional) Paymaster/AA provider accounts (Safe/Biconomy/Coinbase)

### Install

```bash
yarn i
```

### Environment

Create **`.env.local`** from the example:

```bash
cp .env.example .env.local
```

### Run

```bash
yarn dev
# open http://localhost:3000
```

---

## 🔗 Web3 configurations

### Wallet UI

- **RainbowKit**: Familiar multi‑wallet ConnectButton.

---

## 📜 License

MIT © Encoteki
