import { BigNumber } from "ethers";
import moment from "moment";
import { formatUnits } from "ethers/lib/utils";
import { shortenAddress, toReadableAmount } from "./utils";
import { ScanWallet } from "@/market/types";
import { urlScan } from "./networks";
import { AnalysisTrade, ParseLog } from "@/tracker/types";

export const START_MESSAGE = `
What would you like to do today?
Monitor
Active Trades: 1
Disabled Trades: 0
`;

export const HELP_MESSAGE = `
👋 I am iCrypto 🤖. I am an AI bot, a crypto guru which helps identify alpha-bearing and discover token's growth potential.
All in ONE touch.

“Onchain Revolution | Social Discovery by iCrypto AI Bot“

Telegram (EN): https://t.me/onchaindatafi
Twitter (EN): https://twitter.com/onchaindatafi

----------------

✅ One Touch to Open all Token Insights

Token Report & Analysis: Discover 360 degrees of a token with insightful deep dive.

- On-chain: Details about the token you're interested in. 
You'll get insights on special wallet label's performance and activities, and also their impacts on token’s price correlation.
- Social Capture: Trend + Sentiment for any token.

✅ Insight Highlights
Extract & analyze token's on-chain notable stats

- Most Visited
- Hot Social 24H 
- Bluechip
- Accumulated 7D 
- Hot LPs

One Touch, for Alpha Signals, for Smart Traders! 🚀
`;

export const PREMIUM_MESSAGE = `
Premium: ❌

Premium Benefits ⭐
- Speed Boost: Dedicated Premium Bot 🤖
- Launch Tax/Deadblock Simulation 🕵️‍♂️
- 8   ➡️ 30 Trade Monitors
- 2   ➡️ 9 Multi-Wallets
- 3   ➡️ 10 Copytrade Wallets
- 3   ➡️ 10 Concurrent God Modes
- 1   ➡️ 5 Concurrent Presales
- Alpha Counter 🎯
- Last Seen ⌚️
- Maestro Trending List 💎
- Maestro Yacht Club Membership 💎
- First-Class Support
- Future Unrevealed Benefits

🛒 Buy for $200 per 30 days! Use the pay buttons below to start or extend your subscription.
`;

export const listTokensMsg = (address: string = "") => `
💰 Introducing our fast buy menu. 
👉 Purchase tokens with a single click.
👉 Our system uses w1 only and private transactionsto to safeguard against MEV attacks 

📈 Trading on account: \`${shortenAddress(address, 6)}\`
`;

export const walletMsg = ({
  block,
  ethPrice,
  accounts,
}: {
  block: number;
  ethPrice: number;
  accounts?: { address: string; balance: number }[];
}) => `
Ethereum is supported.
Block: ${block}   ═   ETH: $${ethPrice}
💎  TogonBot | [Website](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md) 💎
Snipe & trade at elite speeds for free.

===
${accounts
  ?.map((acc, index) => {
    return `
🏛️  [Wallet-${index}](https://etherscan.io/address/${acc.address})
💵  ${acc.balance}
🔸  ${acc.address}`;
  })
  .join("\n")} `;

export const walletDetail = ({
  block,
  ethPrice,
  balance,
}: {
  block: number;
  ethPrice: number;
  balance: number;
}) => `
⏹️  Block:  ${block} 
💠  ETH:  $${ethPrice}
💎  Wallet Balance:  $${balance}
`;

export const tokenDetail = ({
  name,
  symbol,
  address,
  balance,
}: {
  address: string;
  name: string;
  balance: number | string;
  symbol: string;
}) => `
🔬  ${name} (${symbol})  -  Chain: Etherscan

Links: [Etherscan](https://etherscan.io/token/${address})  -  📈Chart
Your ${name}'s balance: \`${balance}\` ${symbol}
Address: \`${address}\`

🍯 Honeypot Check: Doesnt seem like a [honeypot](https://honeypot.is/ethereum?address=${address})
`;

export const esstimateSwap = ({
  tokenA,
  tokenB,
  amountA,
  amountB,
  amountIn,
  amountOut,
  gwei = "unknown",
  dollars = "unknown",
  ratio,
}: {
  tokenA: string;
  tokenB: string;
  amountIn: number;
  gwei?: number | string;
  amountA: number;
  amountB: number;
  dollars?: number | string;
  amountOut: number;
  ratio: number | string;
}) => `
Estimate ${tokenA}       ➡️      ${tokenB}
You pay \`${amountIn}\` ${tokenA} in your balance: \`${amountA}\`
You receive \`${amountOut}\` ${tokenB}

---
💰 ${tokenB}'s balance from \`${amountB}\` to \`${amountB + amountOut}\`
💰 1 ${tokenB} = \`${ratio}\` ${tokenA}
---

📉 Max slipage: \`0.5%\` _auto_
💸 Fee: \`$0\`
⛽ Network cost: \`${gwei}\` GWEI = $\`${dollars}\`

---
⏲️ This transaction will expire after 1 minute
`;

export const esstimateMsg = ({
  gas,
  amount,
  balance,
  type,
}: {
  gas?: string;
  amount: number;
  balance: number | string;
  type: "BUY" | "SELL";
}) => {
  const action = type === "BUY" ? "Deposit" : "Withdraw";
  const from = type === "BUY" ? "ETH" : "WETH";
  const to = type === "BUY" ? "WETH" : "ETH";

  return `
  Your wallet balance: \`${balance}\` ETH
  ${action} ETH will take \`${gas}\` gwei for gas fee
  From \`${amount}\` ${from} to \`${amount}\` ${to}
`;
};

export const reportMsg = ({
  status,
  hash,
  gas,
}: {
  status: string;
  hash?: string;
  gas?: BigNumber;
}) => `
Your transaction is ${status} 🚀
Hash: \`${shortenAddress(hash, 12)}\`
Gas Cost: \`${formatUnits(gas ?? 0, "gwei")}\` gwei
View in [etherscan](${urlScan}/tx/${hash})
`;

export const report2Msg = ({
  infoA,
  infoB,
  amountA,
  amountB,
  status,
  hash,
  gas,
}: {
  infoA: any;
  infoB: any;
  amountA: number | string;
  amountB: number | string;
  status: string;
  hash?: string;
  gas?: BigNumber;
}) => `
⚡  Your transaction is ${status}
Swap from __${infoA?.symbol}__ to __${infoB?.symbol}__
Sent: \`${amountA}\` ${infoA?.symbol}
Received: \`${amountB}\` ${infoB?.symbol}

----------------------------------------------------------

📈 New account balance:
${infoA?.symbol} balance: \`${infoA?.balance}\` 
${infoB?.symbol} balance: \`${infoB?.balance / 10 ** infoB?.decimals}\` 

----------------------------------------------------------

🤝 Hash: \`${shortenAddress(hash, 12)}\`
Gas Cost: \`${formatUnits(gas ?? 0, "gwei")}\` gwei
View in [etherscan](${urlScan}/tx/${hash})
`;

export const scanWalletmsg = (data: { address: string; balance: string | number }) => `
Scan wallet: \`${data.address}\`
Balance: \`${data.balance}\` ETH
Get account detail: [Debank](https://debank.com/profile/${data.address}?chain=eth) - OR - [Etherscan](${urlScan}/address/${data.address})
`;

export const whaleActionMsg = ({ from, to, value, hash }: any) => `
Whale action: 😎\`${shortenAddress(from)}\` to \`${to}\ with value \`${toReadableAmount(value)}\ 🚨
Check: [Etherscan](${urlScan}/tx/${hash})
`;

export const whaleActionMsg2 = ({
  sendTx,
  receiveTx,
  hash,
}: {
  hash: string;
  sendTx: ParseLog | undefined;
  receiveTx: ParseLog | undefined;
}) => `
⚡ Ethereum ⚡ Uniswap ⚡ Wallet: \`${shortenAddress(sendTx?.address, 8)}\` 
Swap from \`${sendTx?.symbol}\` to \`${receiveTx?.symbol}\`
Sent: ${sendTx?.amount} [${sendTx?.symbol}](${urlScan}/token/${sendTx?.address}) (~$33,329)
Received: ${receiveTx?.amount} [${receiveTx?.symbol}](${urlScan}/token/${receiveTx?.address}) (~$33,260)
Check Tx hash: [Etherscan](${urlScan}/tx/${hash})
`;

export const tradeHistoryMsg = (trade: AnalysisTrade[]) => `
Wallet Trade history 🤟
-----------------------
${trade
  .map(
    ({ symbol, amount, hash, total, timestamp, action }, i) => `
- [Transaction-${i}](${urlScan}/tx/${hash}) || ${moment(timestamp).format("L")}
  ${action === "BUY" ? "🟩" : "🟥"} User ${action} \`${amount.toFixed(
    4,
  )}\` ${symbol} (💲${total.toFixed(4)}) 
`,
  )
  .join("\n")}
`;
