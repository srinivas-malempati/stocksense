import { useState, useEffect, useRef, useMemo } from "react";

/* ═══════════════════════════════════════════════
   STOCKSENSE — Complete Trading Education App
   Splash → Onboard → Profile → Academy → Trade
   API: Groq via /api/chat Vercel serverless
   ═══════════════════════════════════════════════ */

const T = {
  bg:"#080808", surface:"#0f0f0f", card:"#141414", card2:"#1c1c1c",
  border:"#1e1e1e", border2:"#2a2a2a",
  green:"#00D68F", greenDim:"rgba(0,214,143,0.12)", greenGlow:"rgba(0,214,143,0.3)",
  red:"#FF4757", redDim:"rgba(255,71,87,0.12)",
  gold:"#FFD700", goldDim:"rgba(255,215,0,0.1)",
  blue:"#4A90E2", blueDim:"rgba(74,144,226,0.1)",
  purple:"#9B59B6", purpleDim:"rgba(155,89,182,0.1)",
  orange:"#FF8C00", orangeDim:"rgba(255,140,0,0.1)",
  white:"#FFFFFF", g1:"#CCCCCC", g2:"#777777",
  font:"'SF Pro Display',-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif",
};

/* ── Groq API helper — calls our Vercel serverless function ── */
async function callGroq(messages, system) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, system }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.content || "No response received.";
}

const ADVISOR_SYS = `You are Apex, StockSense's AI market analyst. Sharp, confident, data-driven. Give concise punchy answers about stocks, markets, investing strategies, options, bonds, tax strategy. No fluff. Use real numbers when helpful. Always note your answers are educational and not personal financial advice. Keep responses under 200 words unless depth is truly needed.`;

const ANALYSIS_SYS = `You are a sharp investment analyst. Analyze the given stock and respond in EXACTLY this format — no deviation:\nVERDICT: [Bullish/Bearish/Neutral] — [one sharp sentence]\nSAFETY: [X/10] — [one sentence. ETFs=8-9, blue chip=6-8, volatile=4-6]\nBULL CASE: • [reason 1] • [reason 2]\nBEAR CASE: • [risk 1] • [risk 2]\nBEGINNER FIT: [Yes/No/Maybe] — [one honest sentence]\nDISCLAIMER: Educational analysis only. Not financial advice.`;

/* ── DEEP LESSON CONTENT ── */
const CHAPTERS = [
  { id:"c1", no:1, title:"Foundations", subtitle:"Start from absolute zero", color:T.green, dim:T.greenDim, icon:"🌱",
    lessons:[
      { id:"l101", no:1, emoji:"🏛️", title:"What Is the Stock Market?", mins:7,
        body:`The stock market is one of the most powerful wealth-building tools ever created — yet most people never truly understand how it works.

**The simplest explanation:**
A stock market is a place where buyers and sellers trade ownership in companies. When a company wants to raise money to grow, it divides itself into millions of tiny pieces called shares and sells them to the public. Buy a share — you own a piece of that company.

**A real example:**
Apple has ~15.4 billion shares outstanding. Buy one share at $189 and you own 1 in 15 billion of Apple. Apple earned $97 billion in profit last year. Your share represents a claim on those profits — through dividends or rising stock price.

**Why stock markets exist:**
Before stock markets, only the wealthy could fund businesses. In 1602, the Dutch East India Company issued the world's first publicly traded shares — letting ordinary citizens invest in shipping voyages. This idea of shared ownership in enterprises is the foundation of modern capitalism.

→ **Companies** — raise money to hire, build, and compete
→ **Investors** — grow wealth by owning pieces of successful businesses

**The major US exchanges:**
→ **NYSE** — Founded 1792. Lists Apple, JPMorgan, Visa, Coca-Cola.
→ **NASDAQ** — Founded 1971. Tech-heavy. Lists Amazon, Google, Meta, Microsoft, Tesla.

**Market hours:** Mon–Fri, 9:30 AM – 4:00 PM Eastern Time.

**Market indices:**
→ **S&P 500** — 500 largest US companies. THE benchmark.
→ **Dow Jones** — 30 major blue-chip companies.
→ **NASDAQ Composite** — ~3,000 tech-weighted companies.

**The most important fact:** The S&P 500 has returned ~10%/year average over 100 years — through World Wars, recessions, pandemics, and every crisis imaginable. $10,000 invested in 1990 = over $170,000 today.

Investing is owning pieces of real businesses that solve real problems. When those businesses grow — your ownership grows with them.`,
        quiz:[
          {q:"What does buying one share of a company mean?",opts:["Lending money to the company","Owning a small piece of the company","Getting a guaranteed payment","Working for the company"],ans:1},
          {q:"What is the S&P 500?",opts:["500 cheapest stocks","Index tracking 500 largest US companies","A government bond fund","A tech-only exchange"],ans:1},
          {q:"US stock markets open at what time Eastern?",opts:["8:00 AM","9:00 AM","9:30 AM","10:00 AM"],ans:2},
          {q:"The S&P 500's average annual return over 100 years is approximately:",opts:["3%","6%","10%","20%"],ans:2},
        ]},
      { id:"l102", no:2, emoji:"💹", title:"How Stock Prices Move", mins:7,
        body:`Every price movement has a cause. Understanding these forces separates investors from gamblers.

**The governing law: supply and demand**
A stock's price is what the most recent trade happened at. More buyers than sellers → price rises. More sellers than buyers → price falls.

**The seven forces that move prices:**

**1. Earnings reports** — Every company reports results quarterly. Beat expectations → stock jumps. Miss → stock drops. In Feb 2023, Meta beat expectations massively. Stock rose 23% in one day.

**2. Revenue growth** — Markets pay huge premiums for growth. A company growing 30%/year commands far higher valuation than one growing 3%, even if equally profitable today.

**3. Forward guidance** — What management projects for NEXT quarter moves stocks MORE than reported results. Great earnings + weak guidance → stock can still fall 15%.

**4. Federal Reserve / Interest rates** — When Fed raises rates: borrowing costs rise → corporate profits shrink → money flows from stocks to bonds → stocks fall. Growth stocks are hit hardest.

**5. Economic data** — Jobs reports, inflation (CPI), GDP growth all affect investor confidence.

**6. Company-specific news** — CEO change, product launch, lawsuit, acquisition, data breach — any material news moves stocks dramatically.

**7. Sentiment and psychology** — Fear and greed move markets as much as fundamentals. During panics, great businesses trade at ridiculous discounts.

**The Bid-Ask Spread:**
→ **Bid** — highest price a buyer will pay
→ **Ask** — lowest price a seller accepts
→ **Spread** — the difference (a transaction cost)
Apple spread: ~$0.01. Small illiquid stocks: $0.50+.

**Key insight:** Short-term prices = emotion, news, speculation. Long-term prices = earnings, cash flow, business quality. The gap between these is where patient investors profit.`,
        quiz:[
          {q:"What causes a stock price to rise?",opts:["Company pays dividends","More buyers than sellers","Stock exchange opens","Analyst upgrades only"],ans:1},
          {q:"When Fed RAISES interest rates, growth stocks typically:",opts:["Rise strongly","Are unaffected","Tend to fall","Split their shares"],ans:2},
          {q:"A company beats earnings but the stock drops. Most likely reason?",opts:["Market was closed","Management gave weak forward guidance","Too many analysts covered it","CEO resigned"],ans:1},
          {q:"The bid price is:",opts:["The last traded price","Lowest price a seller accepts","Highest price a buyer will pay","The stock's fair value"],ans:2},
        ]},
      { id:"l103", no:3, emoji:"📦", title:"Types of Investments", mins:8,
        body:`The investment universe is vast. Understanding each type lets you build a genuinely intelligent portfolio.

**1. Individual Stocks**
Buying shares in one company. Full upside — and full downside. Requires ongoing research and emotional discipline.
→ Risk: Medium to Very High

**2. ETFs — Exchange Traded Funds ⭐ Best for beginners**
A basket of many stocks that trades like one stock.
→ **VOO** — Vanguard S&P 500 ETF. 0.03%/year. Most recommended first investment worldwide.
→ **VTI** — Total US Market. 4,000+ companies.
→ **VXUS** — All international stocks.
→ **QQQ** — NASDAQ-100. Top 100 NASDAQ companies.
→ **BND** — Total Bond Market.

Why ETFs win: 80-90% of professional fund managers fail to beat their benchmark index over 15 years. An index ETF captures 100% of market return at almost zero cost.

**3. Bonds**
A loan to a government or corporation. They pay fixed interest (coupon) and return principal at maturity.
→ US Treasuries — Safest investment on Earth
→ Corporate bonds — Higher yield, higher risk
→ Municipal bonds — Tax-free interest
→ TIPS — Inflation-protected bonds

Critical rule: Bond prices move INVERSELY to interest rates.

**4. REITs — Real Estate Investment Trusts**
Own income-producing real estate, must pay 90%+ of income as dividends. Real estate exposure without owning property.
→ Best ETF: VNQ (Vanguard Real Estate)

**5. Mutual Funds**
Actively managed by professionals. Higher fees (0.5-1.5%/year). Most underperform their index after fees.

**6. Commodities**
Gold, silver, oil, copper. Inflation hedges. Access via ETFs (GLD, USO, PDBC).

**7. Cryptocurrency**
Extremely volatile. Bitcoin drops 70-85% in bear markets. Maximum allocation: 1-5%.

**Asset allocation by age:**
→ Age 20-30: 90-95% stocks, 5-10% bonds
→ Age 30-45: 80% stocks, 15% bonds, 5% alternatives
→ Age 45-60: 65% stocks, 30% bonds, 5% cash
→ Age 60+: 50% stocks, 40% bonds, 10% cash`,
        quiz:[
          {q:"VOO's annual expense ratio is:",opts:["1.5%","0.5%","0.03%","5%"],ans:2},
          {q:"When interest rates RISE, bond prices:",opts:["Rise","Fall","Stay the same","Double"],ans:1},
          {q:"By law, REITs must distribute what % of taxable income as dividends?",opts:["50%","75%","90%","100%"],ans:2},
          {q:"What % of professional fund managers fail to beat their benchmark over 15 years?",opts:["30-40%","50-60%","80-90%","20%"],ans:2},
        ]},
      { id:"l104", no:4, emoji:"🏦", title:"Brokers, Accounts & Your First Trade", mins:7,
        body:`Opening your first account and placing your first trade is simpler than most people think.

**What is a broker?**
A regulated firm that executes your buy/sell orders. You can't buy stocks directly — you need a broker. All US brokers are regulated by FINRA and SEC. Your cash is protected up to $500,000 by SIPC if the broker fails.

**Best brokers for beginners:**
→ **Fidelity** ⭐⭐⭐⭐⭐ — Best overall. $0 commissions, no minimum, exceptional tools. No payment for order flow. Founded 1946.
→ **Schwab** ⭐⭐⭐⭐⭐ — Exceptional customer service. Great for beginners.
→ **Vanguard** ⭐⭐⭐⭐⭐ — Best for index fund investors. Creator of the index fund.
→ **Robinhood** ⭐⭐⭐⭐ — Simplest app. Fractional shares from $1.

**Account types — this decision is worth hundreds of thousands of dollars:**

**Roth IRA — The Crown Jewel**
Contribute after-tax money. ALL growth and withdrawals are 100% tax-free forever.
→ 2024 limit: $7,000/year
→ Best for: Almost everyone under 50 within income limits

Example: $7,000/year from age 22-30 (just 8 years) at 8% return → ~$1.28M at age 65 — TAX FREE.

**401(k)**
Employer plan. ALWAYS contribute at least to full employer match — that's an instant 50-100% return.
→ 2024 limit: $23,000/year

**Account priority:**
401(k) to match → Roth IRA max → HSA → Max 401(k) → Brokerage

**Order types:**
→ **Market order** — Execute immediately at best available price. Fast but can have slippage.
→ **Limit order** — Execute only at your specified price or better. Use for almost everything.
→ **Stop-loss** — Auto-sells if price drops to set level. Limits losses.
→ **Trailing stop** — Moves up with stock price. Locks in gains.

**Your first trade:**
1. Open Roth IRA at Fidelity
2. Fund via bank transfer (1-3 days)
3. Search VOO
4. Buy with limit order near current ask
5. Enable dividend reinvestment (DRIP)
6. Set up monthly auto-invest`,
        quiz:[
          {q:"SIPC protects your account up to:",opts:["$100,000","$250,000","$500,000","$1,000,000"],ans:2},
          {q:"A limit order means:",opts:["Buy at any available price","Buy/sell only at your specified price or better","Auto-sells on drop","A monthly order"],ans:1},
          {q:"Correct account priority:",opts:["Roth IRA first always","401k to match → Roth IRA → HSA → Max 401k → Brokerage","Brokerage first","Traditional IRA → 401k"],ans:1},
          {q:"What makes Roth IRA powerful?",opts:["No contribution limits","Tax deduction now","All growth and withdrawals 100% tax-free","Employer match"],ans:2},
        ]},
      { id:"l105", no:5, emoji:"📋", title:"Reading a Stock Quote", mins:6,
        body:`Every stock has a data page packed with numbers. Most investors scroll past them. Smart investors read every one.

**Price and movement:**
→ **Current price** — Most recent trade price
→ **Change ($/%)**— Move from yesterday's close
→ **Day high/low** — Today's trading range
→ **52-week high/low** — Yearly range. Near 52-week high = strong momentum. Near low = value opportunity or company in trouble.

**Volume:**
Shares traded today vs average. High volume + price move = conviction. Low volume move = treat with skepticism.

**Market Cap:** Share price × total shares = total company value.
→ Mega cap: $200B+ (Apple $2.9T)
→ Large cap: $10B-$200B
→ Mid cap: $2B-$10B
→ Small cap: $300M-$2B (higher risk/reward)

**P/E Ratio:** Price ÷ annual EPS. The most used valuation metric.
→ S&P 500 average: ~20-25x
→ NEVER compare P/E across sectors (utilities vs software = apples and oranges)

**EPS (Earnings Per Share):** Net income ÷ shares. Growing EPS = healthy business.

**Dividend Yield:** Annual dividend ÷ price × 100. 4% yield = $4/year per $100 invested.

**Beta:** Volatility vs market.
→ Beta 1.0 = moves with market
→ Beta 1.5 = moves 50% MORE (higher risk/reward)
→ Beta 0.5 = moves 50% less (defensive)

**Example — Apple (AAPL):**
Price: $189.30 | Change: +$1.20 (+0.64%)
Market Cap: $2.91T | P/E: 28.4 | EPS: $6.57
Dividend Yield: 0.55% | Beta: 1.19
52-Week: $164.08 – $199.62`,
        quiz:[
          {q:"P/E ratio is:",opts:["Price minus EPS","Price divided by annual earnings per share","EPS divided by price","Market cap divided by revenue"],ans:1},
          {q:"Beta of 1.8 means:",opts:["80% less volatile than market","Moves exactly with market","80% MORE volatile than market","Beta doesn't measure this"],ans:2},
          {q:"High volume + big price decline suggests:",opts:["Likely to reverse","Normal noise","Serious selling pressure","An upcoming dividend"],ans:2},
          {q:"Compare P/E ratios:",opts:["Freely across all stocks","Only within same sector or industry","Only when P/E above 20","Only for stocks you own"],ans:1},
        ]},
      { id:"l106", no:6, emoji:"🔍", title:"How to Research a Stock", mins:8,
        body:`Stock picking without research is speculation. With proper research, it becomes investing.

**Step 1: The Buffett Test**
Can you explain what the company does, how it makes money, and why customers choose it — in two sentences? If not, don't invest. This is Warren Buffett's "circle of competence" rule.

**Step 2: Read the 10-K Annual Report**
Filed with SEC at sec.gov/edgar. Key sections:
→ **Business description** — What they do, their markets
→ **Risk factors** — Every material risk they must legally disclose
→ **Financial statements** — The three core statements
→ **MD&A** — Management's own explanation of performance

**Step 3: Analyze the three financial statements**

**Income Statement:** Revenue → Gross Profit → Operating Income → Net Income. Track growth over 3-5 years.

**Balance Sheet:** Assets vs Liabilities. Key: cash position, total debt, debt-to-equity ratio (above 2x = meaningful risk).

**Cash Flow Statement:** Operating cash flow is the most reliable metric — hardest to manipulate. Free cash flow = operating CF minus capex.

**Step 4: Identify the competitive moat**
→ **Brand** — Apple, Nike, Coca-Cola
→ **Network effects** — Visa, Facebook, Airbnb
→ **Switching costs** — Salesforce, Microsoft Office
→ **Cost advantage** — Amazon, Walmart
→ **Regulatory moat** — Utilities, banks

**Step 5: Check management**
→ Does CEO own significant shares? (skin in the game)
→ Are insiders buying in the open market? (SEC Form 4)
→ Consistent and honest with guidance?

**Step 6: Assess valuation**
PEG ratio (P/E ÷ growth rate) under 1.0 = potentially undervalued.

**Free research tools:**
→ sec.gov/edgar — Official filings
→ finance.yahoo.com — Quotes, financials
→ finviz.com — Stock screener
→ simplywall.st — Visual analysis`,
        quiz:[
          {q:"Where to find free official SEC filings?",opts:["Bloomberg only","Yahoo Finance paid","sec.gov/edgar","Morningstar premium"],ans:2},
          {q:"Most reliable financial metric (hardest to manipulate):",opts:["Net income","Revenue","Free cash flow","Gross profit"],ans:2},
          {q:"'Network effect' moat means:",opts:["Company owns physical networks","More users makes product more valuable for all","Fastest internet","Patent protection"],ans:1},
          {q:"PEG ratio under 1.0 suggests:",opts:["Company losing money","Stock overvalued","Stock may be undervalued relative to growth","P/E is below 1"],ans:2},
        ]},
    ]},
  { id:"c2", no:2, title:"Market Mechanics", subtitle:"How markets really work", color:T.gold, dim:T.goldDim, icon:"⚙️",
    lessons:[
      { id:"l201", no:1, emoji:"🐂", title:"Bull & Bear Markets", mins:6,
        body:`Every investor will live through multiple bull and bear markets. How you respond determines whether you build wealth or destroy it.

**Bull Market:** 20%+ rise from recent trough. Strong economy, rising profits, optimism.
Famous examples: 1990-2000 (+417%), 2009-2020 (+400%+, longest ever), 2020-2022 (doubled in 21 months).

**Bear Market:** 20%+ decline from recent peak. Falling earnings, rising unemployment, widespread fear.
Famous examples: 2000-2002 (NASDAQ -78%), 2007-2009 (S&P 500 -57%), March 2020 (-34% in 33 days — fastest ever, recovered in 5 months), 2022 (-25%).

**Key statistics:**
→ Average bull market: ~4.5 years, +163% gain
→ Average bear market: ~9.5 months, -33% loss
→ Markets spend ~80% of time in bull markets

**Market corrections:** 10-20% decline. Happens roughly once per year. Normal noise — most do NOT become bear markets.

**The emotional investor cycle:**
Optimism → Excitement → Thrill → EUPHORIA (peak — WORST time to buy)
↓ Anxiety → Denial → Fear → Panic → CAPITULATION (trough — BEST time to buy)
↓ Hope → Relief → Optimism (repeat)

Studies show retail investors buy near peaks and sell near bottoms — the "behavior gap" costs ~1.5-2.5%/year.

**What to do:**
→ Bull market: Stay invested. Keep DCAing. Don't add leverage.
→ Bear market: Keep investing. You're buying at a discount. DO NOT SELL.
→ Correction: Ignore it. It's noise.

Nobody — including professionals — can consistently predict market tops and bottoms. The investors who simply stay invested always outperform market-timers over 20+ year periods.`,
        quiz:[
          {q:"Official bear market definition:",opts:["5% from peak","10% from peak","20%+ from peak","30% from peak"],ans:2},
          {q:"Average bear market duration:",opts:["6 weeks","9.5 months","2-3 years","18 months"],ans:1},
          {q:"WORST time to buy per the emotional cycle:",opts:["During panic","At capitulation","At euphoria/peak","During hope phase"],ans:2},
          {q:"Market 'correction' is defined as:",opts:["20%+ decline","A 5% swing","10-20% decline from recent high","Any market decline"],ans:2},
        ]},
      { id:"l202", no:2, emoji:"📝", title:"Order Types Deep Dive", mins:6,
        body:`The order type you place determines the price you pay. Most beginners only use market orders and lose money because of it.

**Market Order:** Execute immediately at best available price.
→ Pros: Guaranteed execution. Fast.
→ Cons: Slippage in fast or illiquid markets — you may pay more than expected.
→ Use for: Highly liquid stocks (Apple, SPY) when price certainty doesn't matter.

**Limit Order:** Execute ONLY at your specified price or better.
→ Buy limit: "Buy maximum at $188" — executes only if price drops there
→ Sell limit: "Sell minimum at $200" — executes only if price reaches there
→ Use for: Almost everything. Gives you price control.

**Stop-Loss Order:** Converts to market order when price hits your stop level.
→ Example: Buy Apple at $180, stop at $165. If it falls to $165 → auto-sells.
→ Risk: Fast markets can "gap" through your stop.

**Stop-Limit Order:** When stop level hit, places a limit order (not market).
→ More price control but may not execute if price moves too fast.

**Trailing Stop:** Stop level automatically moves UP as stock rises, stays put if it falls.
→ Example: 10% trailing stop. Apple rises $180→$220, stop rises $162→$198. Falls to $198 → sells. Locked in the $180-$198 gain.

**GTC vs Day Orders:**
→ Day: Cancels at market close if unfilled. Default.
→ GTC: Active until filled or canceled (~60 days max). For patient limit orders.

**Extended hours (pre-market/after-hours):**
→ Limit orders only (no market orders)
→ Wider spreads, lower volume, higher volatility
→ Most dangerous around earnings releases

**Professional rule:** Use limit orders for virtually everything.`,
        quiz:[
          {q:"A trailing stop order:",opts:["Stays fixed once set","Moves up as stock rises, stays if stock falls","Moves both directions","Only activates in bear markets"],ans:1},
          {q:"'Slippage' is:",opts:["Broker commission","Paying more/less than expected due to market movement","Bid-ask spread only","A type of limit order"],ans:1},
          {q:"Pre/after-hours trading only accepts:",opts:["Market orders","Both market and limit","Limit orders only","Stop orders only"],ans:2},
          {q:"A GTC order:",opts:["Cancels end of day","Active until filled or canceled (~60 days)","Costs extra fees","Only works on NYSE"],ans:1},
        ]},
      { id:"l203", no:3, emoji:"💰", title:"Dividends & Passive Income", mins:6,
        body:`A properly built dividend portfolio can generate enough income to live on without ever selling a single share.

**What is a dividend?**
Cash payment from a company to shareholders, funded from profits. Own 500 shares of Coca-Cola paying $1.84/share annually → receive $920/year just for holding.

**Four key dates:**
→ **Declaration date** — Board announces dividend amount and dates
→ **Ex-dividend date** — Must own shares BEFORE this to receive upcoming dividend
→ **Record date** — Company records shareholders (1 day after ex-div)
→ **Payment date** — Cash hits your account

**Dividend yield:** Annual dividend ÷ price × 100 = yield%
$4 dividend ÷ $100 stock = 4.0% yield. Warning: yield above 8% on mature company often signals the dividend is about to be cut (price has fallen for a reason).

**Dividend Aristocrats:** S&P 500 companies with 25+ consecutive years of dividend increases.
Examples: Coca-Cola (61 years), Johnson & Johnson (61 years), Procter & Gamble (67 years).

**DRIP — Dividend Reinvestment Plans:**
Auto-reinvest dividends to buy more shares. The compounding over decades is extraordinary.

$10,000 at 8% total return:
→ Without DRIP: ~$75,000 after 30 years
→ With DRIP: ~$100,627 after 30 years
→ Extra $25,000+ just from reinvesting dividends

**Tax treatment:**
→ Qualified dividends (most US stocks held 60+ days): 0%, 15%, or 20%
→ Ordinary dividends: taxed as regular income (up to 37%)
→ Pro tip: Hold high-dividend stocks in Roth IRA to shelter from tax.

**Best dividend ETFs:**
→ SCHD — Schwab US Dividend Equity (fan favorite)
→ VYM — Vanguard High Dividend Yield
→ VIG — Vanguard Dividend Appreciation (10+ years of growth)`,
        quiz:[
          {q:"To receive an upcoming dividend, own shares:",opts:["On payment date","After record date","Before ex-dividend date","Any time that quarter"],ans:2},
          {q:"Dividend yield of 11% on mature company is most likely:",opts:["A great opportunity","Warning — may indicate dividend cut","Normal","Sign of great management"],ans:1},
          {q:"DRIP stands for:",opts:["Diversified Return Income Portfolio","Dividend Reinvestment Plan","Daily Return Investment Protocol","Dividend Rate Index Plan"],ans:1},
          {q:"Dividend Aristocrats have raised dividends for at least:",opts:["5 consecutive years","10 years","25 consecutive years","50 years"],ans:2},
        ]},
      { id:"l204", no:4, emoji:"🚀", title:"How IPOs Work", mins:5,
        body:`IPOs generate enormous excitement. They also destroy enormous amounts of retail investor money. Understanding the mechanics reveals why.

**What is an IPO?**
A private company (owned by founders, employees, VCs) sells shares to the public on a stock exchange for the first time.

**The IPO process:**
1. Company hires investment banks (Goldman, Morgan Stanley) as underwriters
2. File S-1 prospectus with SEC — read this carefully
3. Roadshow — executives pitch to institutional investors
4. Price set based on institutional demand
5. Shares begin public trading

**Who benefits from IPOs:**
→ Founders, early employees — finally get liquidity after years
→ VC/PE firms — return capital to their investors
→ Investment banks — charge 3-7% of deal as fees

**Who often gets hurt:**
Retail investors who buy on day one almost never get IPO price — they buy in the open market, often at or after the peak.

**The data:** Studies consistently show average IPOs underperform the market significantly over 3-5 years.

Notable disasters: Uber (IPO $45 → fell to $14), Rivian (IPO $78 → fell to $10), WeWork (cancelled IPO, then bankruptcy).

**Lock-up period:** Insiders cannot sell shares for 90-180 days. When this expires → often a flood of insider selling that pressures the stock lower.

**Honest advice:** Read the S-1. Wait for lock-up expiry. Wait 6-12 months of price history. Only then consider whether risk-reward makes sense vs just buying an index fund.`,
        quiz:[
          {q:"Lock-up period after IPO means:",opts:["Trading paused for retail","Insiders cannot sell shares for 90-180 days","Stock locked at IPO price","SEC review period"],ans:1},
          {q:"S-1 document is:",opts:["SEC's annual report","The IPO prospectus filed with SEC","Fee agreement","A type of order"],ans:1},
          {q:"Retail investors who buy IPOs on day one historically:",opts:["Consistently outperform","Perform same as market","Often underperform over next 3-5 years","Always profit in first week"],ans:2},
          {q:"IPO underwriting fees are typically:",opts:["0.5%","1-2%","3-7%","10-15%"],ans:2},
        ]},
      { id:"l205", no:5, emoji:"🏛️", title:"The Federal Reserve & Your Portfolio", mins:6,
        body:`The Federal Reserve is the most powerful institution in global financial markets. Every investor must understand how it works.

**What is the Fed?**
US central bank established in 1913. Dual mandate: maximize employment AND maintain stable prices (~2% inflation target). FOMC meets 8 times/year to set monetary policy.

**The Federal Funds Rate:**
The rate US banks charge each other overnight. Foundation of all other interest rates — mortgages, car loans, credit cards, corporate bonds.

**How rate changes cascade through markets:**

RATE HIKES:
→ Borrowing more expensive for companies → profit shrinks
→ New bonds pay more → money rotates from stocks to bonds
→ Growth stocks hit hardest (need cheap money; future profits worth less when discounted at higher rates)
→ Banks often benefit (wider lending margins)
→ Real estate pressured (higher mortgage rates)

RATE CUTS:
→ Cheaper borrowing → companies expand more freely
→ Bonds less attractive → money flows to stocks
→ Growth stocks often rally most
→ Real estate and REITs improve

**2022 case study:** Fed raised rates 0% → 5.25% in 18 months (fastest since 1980s). S&P 500 fell 25%. NASDAQ fell 33%. Bonds had worst year in history. ARK Innovation ETF fell 75%.

**QE and QT:**
→ QE — Fed buys bonds, injecting money into economy. Inflates stock/real estate prices.
→ QT — Fed sells bonds, removing money. Restrictive. Negative for asset prices.

**"Don't fight the Fed":**
When Fed is accommodative (cutting) → lean bullish. When hiking aggressively → reduce risk. The Fed's liquidity flow overwhelms individual stock selection.`,
        quiz:[
          {q:"Fed's dual mandate:",opts:["Control stocks and inflation","Maximize employment AND maintain stable prices","Regulate banks only","Set tax rates"],ans:1},
          {q:"Rate hikes typically hit which stocks HARDEST?",opts:["Utilities","Banks","Growth/tech stocks","Commodity stocks"],ans:2},
          {q:"QE means the Fed:",opts:["Raises rates","Sells bonds","Buys bonds, injecting money","Cuts spending"],ans:2},
          {q:"'Don't fight the Fed' means:",opts:["Never criticize Fed","Align risk posture with Fed direction","Always buy bonds","Ignore Fed decisions"],ans:1},
        ]},
      { id:"l206", no:6, emoji:"🔄", title:"Splits, Buybacks & Corporate Actions", mins:5,
        body:`Companies take actions that directly affect your shares. Understanding these prevents confusion and reveals opportunities.

**Stock Splits:** Company divides shares into multiple shares. Price adjusts proportionally — total value unchanged.
Example: Own 10 shares at $300 = $3,000. 3:1 split → 30 shares at $100 = still $3,000.

Why companies split: Makes shares more psychologically accessible. Signals confidence.
Recent: Apple 4:1 (2020), Tesla 5:1 (2020), Nvidia 10:1 (2024).

**Reverse Stock Split:** 10 shares at $3 → 1 share at $30. Usually a WARNING SIGN — done by distressed companies to avoid delisting below $1.

**Share Buybacks:** Company uses cash to repurchase its own shares.
→ Reduces shares outstanding → EPS increases (same earnings ÷ fewer shares)
→ Can support or lift the stock price
→ Tax-efficient (vs dividends — shareholders choose when to realize gains)

Apple has bought back $700B+ since 2012 — the most aggressive buyback in corporate history. Primary reason EPS grew faster than revenue.

Buybacks are value-creating when buying at undervalued prices. Value-destroying when overpaying at market peaks.

**Mergers & Acquisitions:**
→ Being acquired: Typically wonderful — acquirers pay 20-50% premium above market. You get cash or acquiring company shares.
→ Making an acquisition: Acquirer's stock often falls initially. Long-term depends on whether deal creates real value.

**Spin-offs:** Parent distributes subsidiary shares to existing shareholders. Spin-offs historically outperform the market in the 2-3 years following separation — often because institutional investors who don't want the small spin-off sell indiscriminately, creating temporary undervaluation.`,
        quiz:[
          {q:"10 shares at $200. 4:1 split. You now have:",opts:["10 shares at $50","40 shares at $50","10 shares at $800","40 shares at $200"],ans:1},
          {q:"Reverse stock split usually signals:",opts:["Positive growth","Warning — typically done by distressed companies","Same as regular split","Mandatory after certain price"],ans:1},
          {q:"Buybacks increase EPS because:",opts:["Revenue increases","Expenses decrease","Same earnings ÷ fewer shares = higher per-share earnings","Stock price rises"],ans:2},
          {q:"Being acquired by another company typically means:",opts:["Forced to sell at loss","Receive premium above market price","Must decide within 24 hours","Receive nothing"],ans:1},
        ]},
    ]},
  { id:"c3", no:3, title:"Analysis Methods", subtitle:"Read charts and financials", color:T.blue, dim:T.blueDim, icon:"🎯",
    lessons:[
      { id:"l301", no:1, emoji:"🧮", title:"Fundamental Analysis", mins:7,
        body:`Fundamental analysis determines what a company is actually worth — then compares that to the market price.

**Key profitability metrics:**

**Gross Margin** = (Revenue − COGS) ÷ Revenue
→ Software: 70-85% (exceptional)
→ Semiconductors: 50-65%
→ Retailers: 25-35% (volume-dependent)
Expanding margins = improving competitive position.

**Return on Equity (ROE)** = Net Income ÷ Shareholders Equity
→ 15%+: Solid · 20%+: Strong · 30%+: Exceptional
Buffett screens specifically for 15%+ sustained ROE.

**Return on Invested Capital (ROIC)**
The gold standard metric. Companies with ROIC consistently above cost of capital create value. Below it — they destroy value regardless of what earnings show.

**Valuation methods:**

**P/E Ratio** — Price ÷ EPS. Most used but sector-specific.

**PEG Ratio** — P/E ÷ Annual growth rate.
→ Under 1.0: potentially undervalued · ~1.0: fair · Above 2.0: potentially overvalued

**EV/EBITDA** — Better than P/E for companies with different debt levels.

**Price/Free Cash Flow** — More reliable than P/E (FCF is harder to manipulate).

**DCF (Discounted Cash Flow):**
Project future free cash flows, discount back at required return (10-12%). Sum = intrinsic value. Buy at 25-30% discount to intrinsic value (margin of safety).

**Red flags:**
❌ Revenue declining 2+ consecutive quarters
❌ Gross margins consistently contracting
❌ Debt growing faster than cash flow
❌ Persistent negative free cash flow in mature business
❌ Accounts receivable growing much faster than revenue`,
        quiz:[
          {q:"ROIC measures:",opts:["Revenue growth","How efficiently ALL capital generates profit","Stock appreciation","Dividend reliability"],ans:1},
          {q:"PEG of 0.65 suggests:",opts:["Company losing money","Stock overvalued","Stock potentially undervalued relative to growth","P/E below 1"],ans:2},
          {q:"High gross margins indicate:",opts:["High-volume business","Strong pricing power and business model efficiency","Cheaply valued","Low competition"],ans:1},
          {q:"Free cash flow is considered most reliable because:",opts:["It's larger","Reported more frequently","Hardest to manipulate through accounting","Auditors focus on it"],ans:2},
        ]},
      { id:"l302", no:2, emoji:"📈", title:"Technical Analysis & Charts", mins:7,
        body:`Technical analysis studies price action and volume to forecast movements. Professional traders use it universally — and understanding it helps you navigate markets.

**Candlestick charts:**
Each candle = one time period. Body spans open to close.
→ Green candle: Closed HIGHER than opened (bulls won)
→ Red candle: Closed LOWER than opened (bears won)
→ Wicks show how high/low price went before reversing

**Key candlestick patterns:**
→ **Doji** — Open ≈ close. Indecision. Often precedes reversal.
→ **Hammer** — Small body, long lower wick. At end of downtrend = potential bounce.
→ **Shooting Star** — Small body, long upper wick. At end of uptrend = potential drop.
→ **Engulfing** — One candle completely engulfs prior. Strong reversal signal.

**Trend analysis:**
→ Uptrend: Higher highs + higher lows. Buy pullbacks to trend line.
→ Downtrend: Lower highs + lower lows. Avoid longs.
→ Sideways: Buy at support, sell at resistance.

**Support & Resistance:**
→ Support — Price floor where buyers historically appear
→ Resistance — Price ceiling where sellers dominate
→ Breakout on HIGH volume through resistance = one of the most reliable signals

**Moving Averages:**
→ 50-day MA — Medium-term trend
→ 200-day MA — Long-term institutional reference
→ **Golden Cross** — 50 MA crosses above 200 MA → long-term bullish
→ **Death Cross** — 50 MA crosses below 200 MA → bearish

**RSI (0-100):**
→ Above 70: Potentially overbought
→ Below 30: Potentially oversold
→ Divergence: Price makes new high but RSI doesn't → potential reversal

**Professional rule:** Use fundamentals to identify WHAT to buy. Use technicals to determine WHEN to buy.`,
        quiz:[
          {q:"Golden Cross means:",opts:["Stock hits all-time high","50-day MA crosses above 200-day MA","RSI hits 70","Price breaks prior high"],ans:1},
          {q:"RSI below 30 indicates:",opts:["Strong momentum","Overbought","Potentially oversold","MACD crossover"],ans:2},
          {q:"Green candlestick means:",opts:["High volume","Closed LOWER than opened","Closed HIGHER than opened","Dividend paid"],ans:2},
          {q:"Resistance broken with high volume typically becomes:",opts:["New resistance","New support","Irrelevant","Sell signal"],ans:1},
        ]},
      { id:"l303", no:3, emoji:"📊", title:"Reading Earnings Reports", mins:6,
        body:`Earnings season moves stocks 20%+ in a single day. Learning to read reports is one of the highest-value skills in investing.

**Key components:**

**1. EPS vs Consensus Estimate**
Net income ÷ diluted shares = EPS. Compared to Wall Street consensus.
→ Beat significantly → usually rallies
→ Miss → usually drops
The market prices in EXPECTATIONS. 25% earnings growth can cause a stock to fall if analysts expected 30%.

**2. Revenue vs Estimate**
Often more important than EPS. Revenue = actual business demand. Harder to fake with cost cuts.

**3. Gross Margin trend**
Expanding margins = pricing power and improving efficiency. One of the most bullish fundamental signals.

**4. Operating cash flow vs net income**
If OCF consistently below net income → red flag for accounting concerns.

**5. Forward guidance — THE most important part**
→ Raised guidance → strong bullish catalyst
→ Maintained guidance → neutral
→ Lowered guidance → often severe sell-off even if results beat

**6. The conference call**
60-90 minutes after the press release. Analysts ask tough questions. Listen for: management tone, specific language about demand environment, what analysts are worried about.

Transcripts available at: seekingalpha.com, company IR websites.

**The "beat and raise" pattern:**
Companies that consistently beat EPS AND revenue AND raise guidance → the most rewarded by markets. This is the hallmark of genuinely excellent businesses.

**GAAP vs Adjusted earnings:**
Companies report both. Adjusted excludes stock comp, restructuring. Always reconcile — aggressive "adjustments" can hide ongoing problems.`,
        quiz:[
          {q:"Most important part of earnings for stock reaction:",opts:["Revenue from last year","Forward guidance","Historical EPS","Stock compensation"],ans:1},
          {q:"'Beat and raise' means:",opts:["Beat earnings AND raised forward guidance","Raised prices","Beat one metric, missed another","Beat revenue but missed EPS"],ans:0},
          {q:"Stock can fall after beating estimates because:",opts:["Accounting rules require it","Management gave weak forward guidance","Too many analysts","CEO resigning"],ans:1},
          {q:"OCF consistently below net income is:",opts:["Always fine","Potential red flag for accounting","Sign of high dividends","Indicates losing money"],ans:1},
        ]},
      { id:"l304", no:4, emoji:"🌍", title:"Sectors & Rotation", mins:5,
        body:`The S&P 500 has 11 sectors. They behave very differently — understanding this gives you a real edge.

**The 11 sectors (% of S&P 500):**
1. Information Technology ~29% — Apple, Microsoft, Nvidia
2. Financials ~13% — JPMorgan, Berkshire, Visa
3. Health Care ~12% — UnitedHealth, Eli Lilly
4. Consumer Discretionary ~10% — Amazon, Tesla, Nike
5. Communication Services ~9% — Google, Meta, Netflix
6. Industrials ~8% — Caterpillar, Boeing, UPS
7. Consumer Staples ~6% — P&G, Coca-Cola, Walmart
8. Energy ~4% — ExxonMobil, Chevron
9. Real Estate ~2.5% — Prologis, American Tower
10. Materials ~2.5% — Linde, Freeport-McMoRan
11. Utilities ~2.5% — NextEra, Duke Energy

**Cyclical vs Defensive:**
→ **Cyclical** (soar in expansions, collapse in recessions): Tech, Consumer Discretionary, Industrials, Financials
→ **Defensive** (stable in recessions — people buy food/medicine/electricity regardless): Consumer Staples, Healthcare, Utilities

**Classic rotation by economic phase:**
→ Early recovery: Financials, Consumer Discretionary
→ Mid expansion: Technology, Industrials, Energy
→ Late cycle: Energy, Materials, Healthcare
→ Recession: Consumer Staples, Healthcare, Utilities

**Interest rate sensitivity:**
→ Rate rises HURT: REITs, Utilities, Growth Tech
→ Rate rises HELP: Financials/Banks

**Key takeaway:** A broad S&P 500 ETF (VOO) holds all sectors at market weight and rebalances automatically — usually the smarter approach vs trying to time sector rotation.`,
        quiz:[
          {q:"Largest sector in S&P 500:",opts:["Healthcare","Financials","Information Technology","Consumer Discretionary"],ans:2},
          {q:"Defensive sectors are:",opts:["Tech, Energy, Financials","Consumer Staples, Healthcare, Utilities","Industrials, Materials","Communication, Discretionary"],ans:1},
          {q:"Rate rises typically BENEFIT:",opts:["REITs","Utilities","Financials/Banks","Growth Tech"],ans:2},
          {q:"During recession, these sectors tend to outperform:",opts:["Tech, Discretionary","Industrials, Materials","Consumer Staples, Healthcare, Utilities","Energy, Financials"],ans:2},
        ]},
      { id:"l305", no:5, emoji:"💎", title:"Valuation Methods", mins:6,
        body:`Valuation is the foundation of every intelligent investment. Paying the wrong price for even the world's best company produces poor returns.

**The core principle (Benjamin Graham):**
A business is worth the sum of all cash it will ever generate, discounted back to today's dollars. Every valuation method is an attempt to estimate this.

**DCF — Discounted Cash Flow:**
1. Project free cash flow for years 1-10
2. Terminal value: Year 10 FCF × (1 + growth) ÷ (discount − growth). Use 3% long-term growth, 10-12% discount rate.
3. Discount all values back to today
4. Sum = intrinsic value per share
5. Buy at 25-30% discount = margin of safety

**Comparable Company Analysis (Comps):**
Value using multiples vs similar public companies.
1. Find 5-10 peer companies
2. Calculate their average P/E, EV/EBITDA, EV/Revenue
3. Apply peer multiples to your target
4. Adjust for quality differences

**What justifies a premium:**
→ Revenue growing 25%+ consistently
→ Expanding gross and operating margins
→ ROIC significantly above cost of capital
→ Large, growing total addressable market
→ Durable competitive moat

**What warrants a discount:**
→ Declining revenue or market share
→ No competitive differentiation
→ High debt with uncertain cash generation
→ Regulatory risk or disruption threat

**Margin of Safety (Benjamin Graham):**
Never pay full intrinsic value. Demand 25-50% discount. This protects against:
→ Errors in your growth assumptions (you will be wrong)
→ Business deterioration
→ Provides asymmetric payoff: limited downside, meaningful upside

"Buy $1 bills for $0.65." That's the entire concept.`,
        quiz:[
          {q:"Margin of safety means:",opts:["Stop-loss order","Buying at significant discount to intrinsic value","Government insurance","Portfolio diversification"],ans:1},
          {q:"DCF discount rate represents:",opts:["Inflation rate","Broker's fee","Your required rate of return","Company's cost of debt"],ans:2},
          {q:"Price/Book most useful for valuing:",opts:["High-growth tech","All sectors equally","Banks and financial companies","Commodity businesses only"],ans:2},
          {q:"'Comps' analysis involves:",opts:["Comparing to own history","Valuing by comparing multiples to similar public companies","Reading SEC filings","DCF only"],ans:1},
        ]},
      { id:"l306", no:6, emoji:"⚖️", title:"Portfolio Construction", mins:6,
        body:`Owning great investments is necessary but insufficient. HOW you combine them determines your real-world outcome.

**The Core-Satellite Framework:**
→ **Core (60-80%):** Low-cost, broadly diversified, passive ETFs. Your foundation. Never sell in a panic.
  Examples: VOO, VTI, VXUS, BND

→ **Satellite (20-40%):** Active bets — individual stocks you've deeply researched.
  Examples: 5-8 companies you know deeply.

**The Three-Fund Portfolio (optimal for most investors):**
1. VTI — Total US Market (60%)
2. VXUS — Total International (30%)
3. BND — Total Bond Market (10%)

Owns ~10,000 stocks worldwide. Costs ~0.06%/year total. Rebalance annually. Has beaten majority of actively managed portfolios over 20-year periods.

**Geographic diversification:**
US = ~60% of global market cap. International diversification (VXUS) protects against US underperformance (see: 2000-2010 "lost decade" when international outperformed significantly).

**True diversification is correlation-based:**
Adding more tech stocks to a tech-heavy portfolio is NOT diversification. You need assets that don't all fall together.
→ Stocks + Bonds: Historically negative correlation
→ US + International: Moderate positive correlation
→ Stocks + Gold: Low correlation (gold often rises during crises)

**Rebalancing:**
Markets drift. If US stocks outperform, they become too large a %. Rebalancing means:
→ Selling a bit of what grew
→ Buying a bit of what lagged
This systematically enforces buy-low-sell-high. Do annually.

**Position sizing:**
→ Maximum 5-10% in any single stock
→ Maximum 25-30% in any single sector
→ Core ETFs can be large — already diversified internally

**The ultimate test:**
Can you hold this portfolio through a 40% decline lasting 18 months without selling? If no → reduce equity until yes. The best portfolio is the one you'll actually hold through a bear market.`,
        quiz:[
          {q:"Core in Core-Satellite is for:",opts:["Active stock picking","High-risk bets","Low-cost diversified passive ETFs","Day trading"],ans:2},
          {q:"Three-Fund Portfolio is:",opts:["3 individual stocks","VTI + VXUS + BND","VOO + QQQ + GLD","US stocks + crypto + bonds"],ans:1},
          {q:"Rebalancing means:",opts:["Switching brokers annually","Adding to best performers","Restoring target allocation by selling winners and buying laggards","Changing strategy after each crash"],ans:2},
          {q:"Max recommended in any single individual stock:",opts:["25-30%","50% with conviction","5-10%","No limit"],ans:2},
        ]},
    ]},
  { id:"c4", no:4, title:"Advanced Instruments", subtitle:"Options, shorting & leverage", color:T.purple, dim:T.purpleDim, icon:"🧠",
    lessons:[
      { id:"l401", no:1, emoji:"🎯", title:"Options: Complete Guide", mins:9,
        body:`Options are the most powerful — and most dangerous — instruments available to retail investors. More retail traders lose money on options than any other instrument. Yet used correctly, options reduce risk and generate income.

**What is an option?**
A CONTRACT giving the buyer the RIGHT — not obligation — to buy or sell 100 shares at a specific price (strike) before a specific date (expiration). The buyer pays a PREMIUM — their maximum possible loss.

**CALL option — right to BUY:**
You believe the stock will go UP.

Example: Apple at $180. Buy 1 call contract, $190 strike, 45 days, $3.50 premium.
→ Total cost: $350 (maximum you can lose)
→ Apple rises to $205: option worth $15 ($205-$190). Profit: ($15-$3.50) × 100 = $1,150 on $350 = 329% return
→ Apple stays below $190: expires worthless. Lose $350.

**PUT option — right to SELL:**
You believe the stock will go DOWN, or want portfolio insurance.

Example: Apple at $180. Buy 1 put, $170 strike, 45 days, $2.80 premium.
→ Total cost: $280
→ Apple crashes to $140: put worth $30. Profit: ($30-$2.80) × 100 = $2,720
→ Apple stays above $170: expires worthless. Lose $280. Like unused insurance.

**The Greeks:**
→ **Delta** — Option price change per $1 stock move. Calls: 0 to +1. Puts: -1 to 0.
→ **Theta** — Daily time decay. Options lose value every day from time alone. Works AGAINST buyers, FOR sellers.
→ **Vega** — Sensitivity to implied volatility. High IV = expensive options.
→ **Gamma** — Rate of delta change. High near expiration for at-the-money options.

**Income strategies for stock owners:**

**Covered Call:** Own 100 shares → sell one call against them → collect premium.
→ Stock stays below strike: keep premium + shares → repeat monthly
→ Stock rises above strike: shares get called away at strike
Best for: Income on stocks you'd hold anyway. Caps upside.

**Cash-Secured Put:** Hold cash to buy 100 shares → sell a put → collect premium.
→ Stock stays above strike: keep premium
→ Stock falls below strike: you buy shares at strike (at a discount you were willing to pay)
Warren Buffett uses this to acquire positions at lower prices.

**Why most retail options traders lose:**
→ ~75-80% of options expire worthless (sellers win more often)
→ Theta decay constantly erodes buyer value
→ Leverage amplifies losses as much as gains`,
        quiz:[
          {q:"A CALL option gives you the right to:",opts:["Sell 100 shares at strike","Buy 100 shares at strike","Receive dividends","Both buy and sell"],ans:1},
          {q:"Theta (Θ) represents:",opts:["Stock's beta","Option gain per $1 stock move","Daily time decay — option loses value each day","Sensitivity to volatility"],ans:2},
          {q:"Buy a put option when you expect stock to:",opts:["Rise significantly","Pay large dividend","Fall in price or as insurance","Stay exactly flat"],ans:2},
          {q:"Covered call involves:",opts:["Buying calls with margin","Owning shares AND selling calls against them for income","Buying calls and puts together","Shorting shares and buying calls"],ans:1},
        ]},
      { id:"l402", no:2, emoji:"📉", title:"Short Selling Explained", mins:6,
        body:`Short selling lets you profit from declining stocks. It contains unlimited loss potential. Understanding it — even if you never short — makes you a more complete investor.

**The mechanics:**
1. Borrow shares from broker (from other customers' holdings)
2. Immediately sell borrowed shares at current price
3. Wait for price to decline
4. Buy back shares at lower price ("cover" the short)
5. Return shares to broker
6. Profit = selling price − buyback price − borrowing fees

Example: Borrow/sell 100 shares of XYZ at $50 = $5,000 received. Stock falls to $28. Buy back for $2,800. Return shares. Profit: $2,200.

**Why short selling is uniquely dangerous:**
Buying stocks: Maximum loss = 100% (stock goes to $0).
Short selling: Maximum loss = UNLIMITED. Stocks can rise infinitely in theory.

Short XYZ at $5 → rises to $10 (-$500) → $50 (-$4,500) → $200 (-$19,500) → $500 (-$49,500). All on a 100-share position.

**The Short Squeeze — the nightmare:**
Heavy short interest → stock starts rising → shorts forced to buy to limit losses → buying drives price higher → forces more shorts to cover → price spikes further. Feedback loop.

GameStop 2021: Short interest >100% of float. Reddit's WSB coordinated buying. GME: $5 → $483 in weeks. Melvin Capital lost 53% in one month.

**Borrowing costs:**
Pay daily fees to borrow shares. Easy to borrow: 0.5-2%/year. Hard to borrow (heavily shorted): 50-100%+/year.

**Safer alternatives for bearish exposure:**
→ Put options — defined maximum loss (just the premium)
→ Inverse ETFs — SH (inverse S&P), PSQ (inverse NASDAQ) — short-term only
→ Reduce equity allocation

**For most retail investors:** Avoid short selling. Risk/reward deeply unfavorable. Use puts or inverse ETFs instead.`,
        quiz:[
          {q:"Short selling is dangerous because:",opts:["Higher commissions","Limited upside","Losses are UNLIMITED as stocks can rise indefinitely","Requires large account"],ans:2},
          {q:"Short squeeze mechanically:",opts:["Company issues new shares","Shorts forced to buy to cover, driving price higher in feedback loop","Regulators halt trading","Company buys back shares"],ans:1},
          {q:"'Covering' a short means:",opts:["Adding more to short","Buying back shares to return to lender","Setting a stop-loss","Selling put options"],ans:1},
          {q:"Safest approach for bearish exposure for retail investors:",opts:["Direct short selling","Buying put options or inverse ETFs","Margin short selling","Selling covered calls"],ans:1},
        ]},
      { id:"l403", no:3, emoji:"⚡", title:"Margin Trading & Leverage", mins:6,
        body:`Margin is borrowed money from your broker using your portfolio as collateral. It magnifies both gains and losses. It has destroyed more retail accounts than any other single mechanism.

**What is margin?**
Using your portfolio as collateral, broker lends you up to 50% of stock value (Regulation T). With $10,000 of your own money, you can control $20,000 of stocks.

**The math in both directions:**

WITH 2:1 margin ($20,000 position):
→ Stock rises 20%: $4,000 gain (40% on YOUR $10,000) minus ~$800 annual interest
→ Stock falls 20%: $4,000 loss (40% of YOUR money gone)
→ Stock falls 50%: $10,000 loss = 100% of YOUR money GONE. Plus you still owe the broker.

**The margin call:**
When account equity falls below maintenance margin (~25% of position), you receive a margin call. Must immediately:
a) Deposit more cash
b) Sell positions

The cruelest part: Margin calls come during crashes — forcing you to sell at the worst possible time. March 2020 margin calls forced retail investors to sell at the exact bottom, days before the most violent recovery in market history.

**Margin interest:**
Currently ~8-13%/year. At 10% on $10,000 borrowed = $1,000/year carrying cost. Your leveraged position must return more than this just to break even on the borrowed portion.

**Volatility decay trap:**
Stock rises 50% then falls 33% = break even without margin. WITH 2:1 margin: after the same path you have a net LOSS due to leveraged drawdown. Leverage is mathematically disadvantageous in volatile markets even if the asset ends flat.

**For most retail investors:** Do not use margin. The expected value is negative. The psychological damage of a forced margin call during a crash sets back investment journeys years or permanently.`,
        quiz:[
          {q:"2:1 margin, position falls 50%, you lose:",opts:["50% of capital","75% of capital","100% of capital","25% of capital"],ans:2},
          {q:"Margin call requires:",opts:["Buy more of falling position","Deposit more cash OR sell positions immediately","Wait for recovery","Nothing, it's automatic"],ans:1},
          {q:"Margin calls are most dangerous because:",opts:["During bull markets","During sideways markets","During crashes — forcing sales at worst possible time","Only for new accounts"],ans:2},
          {q:"Annual margin interest at 11% on $15,000 borrowed:",opts:["$150","$750","$1,650","$3,300"],ans:2},
        ]},
      { id:"l404", no:4, emoji:"📦", title:"ETFs Deep Dive", mins:6,
        body:`You know ETFs are excellent. Now understand HOW they work and the risks most investors miss.

**The creation/redemption mechanism:**
Authorized Participants (large banks) can create new ETF shares by delivering the underlying basket of stocks, and redeem ETF shares by returning them for the underlying stocks. This arbitrage keeps ETF prices within 0.01-0.1% of their Net Asset Value (NAV).

**Complete ETF taxonomy:**
→ Broad equity: VOO, VTI, SPY, IVV
→ International: VXUS, VEA, VWO, EFA
→ Sector: XLK (tech), XLF (finance), XLE (energy), XLV (health)
→ Dividend: SCHD, VYM, VIG, DGRO
→ Bond: BND, AGG, TLT, SHY, HYG/JNK (high yield)
→ Real Estate: VNQ, SCHH
→ Commodities: GLD, SLV, PDBC
→ Inverse: SH (-1x S&P), PSQ (-1x NASDAQ) — short-term hedging ONLY
→ Leveraged: TQQQ (3x NASDAQ), UPRO (3x S&P) — NEVER hold long-term

**The fee compounding math:**
$100,000 at 8% gross for 30 years:
→ VOO (0.03%): ~$978,000
→ Active fund (1.0%): ~$732,000
→ Difference: $246,000 — entirely from fees
Every 0.1% in annual fees ≈ $25,000 lost over 30 years on $100,000.

**Risks most investors miss:**
→ QQQ has 40%+ in just 5-6 mega-caps — not as diversified as it seems
→ Leveraged ETFs lose to volatility decay even if index goes up — never hold long-term
→ Niche/exotic ETFs: wide spreads, low liquidity — always use limit orders
→ Factor ETFs (value, momentum): can underperform for years before "working"`,
        quiz:[
          {q:"What keeps ETF prices close to NAV?",opts:["SEC daily resets","Creation/redemption mechanism with Authorized Participants","Daily broker reconciliation","Government regulation"],ans:1},
          {q:"$100,000 for 30 years, 1% vs 0.03% fee difference costs approximately:",opts:["$1,000","$10,000","$246,000","$50,000"],ans:2},
          {q:"Leveraged ETFs (TQQQ, UPRO) should NEVER be held long-term because:",opts:["Too expensive","They lose to volatility decay even if index rises","They reset quarterly","SEC prohibits it"],ans:1},
          {q:"QQQ's main diversification risk:",opts:["Too many small companies","Too much international","40%+ concentrated in just 5-6 mega-caps","High expense ratio"],ans:2},
        ]},
      { id:"l405", no:5, emoji:"📜", title:"Bonds: The Full Picture", mins:7,
        body:`Bonds are fundamental to every complete portfolio. In 2022, long-term bond funds fell 35%. Understanding WHY prevents expensive surprises.

**The basic bond:**
You lend $1,000 to US government. They pay 4% annually ($40/year, paid semi-annually). After 10 years, they return your $1,000. Total received: $1,400.

**The most critical concept — inverse price/rate relationship:**
If you hold a bond paying 3% and rates rise to 6%, your bond looks unattractive vs new bonds paying 6%. Nobody pays full price — they demand a discount. Your bond's price FALLS.

When rates fall, existing bonds (paying higher rates) become valuable. Prices RISE.

This is why 2022 was catastrophic — Fed raised rates from 0% to 5.25% in 18 months. TLT (long-term Treasury ETF) fell 35%.

**Duration — quantifying rate risk:**
Duration measures sensitivity. Duration of 10 means: if rates rise 1%, bond falls ~10%.
→ Short-term (1-3yr): Duration 2-3. Low sensitivity. Lower yield.
→ Long-term (20-30yr): Duration 15-20+. Very high sensitivity. Highest yield.

When rates rising: own short-duration. When rates falling: own long-duration.

**Credit quality spectrum:**
→ US Treasuries (AAA) — Zero default risk
→ Investment grade corporates (AAA-BBB-) — Low default probability
→ High yield/Junk (BB+ and below) — High default risk. Behaves like stocks in recessions.
→ Municipal bonds — Interest usually tax-free federally. Best for high-income investors.

**TIPS:** Principal adjusts UP with inflation (CPI). Perfect inflation hedge. Access via SCHP or TIP ETFs.

**Bond ETFs:**
→ BND — Total US bond market
→ TLT — Long-term Treasuries (rate sensitive)
→ SHY — Short-term Treasuries (park cash)
→ LQD — Investment grade corporate
→ SCHP/TIP — TIPS (inflation protection)`,
        quiz:[
          {q:"When rates RISE, existing bond prices:",opts:["Rise — good for bondholders","Fall — bad for bondholders","Stay unchanged","Only long-term bonds affected"],ans:1},
          {q:"Duration of 15: if rates rise 1%, bond falls approximately:",opts:["1%","5%","15%","0.15%"],ans:2},
          {q:"TIPS adjust for:",opts:["Stock market declines","Credit risk","Inflation — principal rises with CPI","Interest rate changes only"],ans:2},
          {q:"Municipal bonds most attractive for:",opts:["Low-income investors","Beginners only","High-income investors (federal tax exemption)","Foreign investors"],ans:2},
        ]},
      { id:"l406", no:6, emoji:"🌐", title:"Alternative Investments", mins:5,
        body:`Beyond stocks and bonds: some alternatives genuinely diversify. Most are speculative traps in sophisticated clothing.

**Direct Real Estate:**
Pros: Tangible asset, rental income, inflation hedge, leverage via mortgages, tax depreciation.
Cons: Illiquid (months to sell), management burden, 5-10% transaction costs, concentration risk.
For most investors: REITs (VNQ) give real estate exposure with full liquidity, zero management, better diversification.

**Gold and precious metals:**
Historical real return: ~0-1%/year over very long periods. Not an investment — portfolio insurance.
→ Allocation: 5% maximum
→ Access: GLD or IAU ETFs (avoid physical storage)
→ Works: during currency crises, geopolitical turmoil, severe inflation

**Commodities broadly:**
Oil, copper, wheat, lumber. Cyclical, inflation-sensitive. Useful 5-10% for inflation hedging. Access: PDBC.

**Private Equity:**
Typically requires accredited investor ($1M+ net worth). Lock-up: 5-10 years. Fees: 2% annual + 20% carried interest. For most retail investors: unsuitable.

**Cryptocurrency:**
→ Bitcoin has hard cap of 21 million coins — genuinely scarce
→ Drops 70-85% in bear markets historically
→ Now accessible via spot Bitcoin ETFs (IBIT, FBTC)
→ No underlying cash flows — narrative/scarcity/adoption driven
→ Maximum allocation: 1-5% if you invest at all

**The framework:**
Alternatives should be maximum 5-10% of portfolio. Added complexity, fees, illiquidity, and risk rarely justify more vs simply owning more stocks and bonds cheaply.`,
        quiz:[
          {q:"Gold's historical real return over long periods:",opts:["5-7%/year","10%+/year","0-1%/year","-2%/year"],ans:2},
          {q:"Private equity typically requires:",opts:["Any investor with $1,000","Only institutions","Accredited investor status with long illiquidity","A financial advisor"],ans:2},
          {q:"Max recommended crypto allocation:",opts:["20-25%","10-15%","1-5% or none","50% for young investors"],ans:2},
          {q:"Main advantage of REITs over direct real estate:",opts:["Always higher returns","Government guarantee","Liquidity, diversification, zero management, accessible with small amounts","No tax implications"],ans:2},
        ]},
    ]},
  { id:"c5", no:5, title:"Strategy & Wealth", subtitle:"Build your financial future", color:T.orange, dim:T.orangeDim, icon:"🏆",
    lessons:[
      { id:"l501", no:1, emoji:"🧠", title:"Investor Psychology & Biases", mins:7,
        body:`Ask the world's greatest investors what the biggest risk is. Same answer every time: yourself.

**The behavior gap (DALBAR study):**
For 30+ years, DALBAR has tracked the difference between fund returns and actual investor returns. Consistent finding: average equity investor earns ~1.5-2.5% LESS per year than the funds they invest in. Over 20 years this gap = hundreds of thousands of dollars lost — on the exact same fund — entirely from emotional timing.

**Loss Aversion (Nobel Prize, Daniel Kahneman):**
Losses feel ~2.0-2.5x more painful than equal gains feel good. Losing $1,000 hurts about as much as gaining $2,500 feels good.

Consequences:
→ Sell winners too early (lock in gain before it "disappears")
→ Hold losers too long (won't sell until back to cost basis)
→ Avoid markets entirely after bad experiences
→ Sell everything during crashes (catastrophically wrong)

**Recency bias:**
Brain overweights recent events. After 3-year bull market: "stocks always go up." After crash: "they'll never recover." Investors who avoided stocks 2009-2019 (scared by 2008) missed a 400%+ decade.

**Overconfidence:**
~80% of investors think they're above average. Mathematically impossible. Most dangerous: someone who made 50% in 2020-2021 (nearly everything rose) and thinks they're a genius.

**Confirmation bias:**
After buying a stock, you only read bullish news. Bear arguments get rationalized away. Antidote: actively seek out the BEST bear case for every position you hold.

**Herd mentality:**
Buying because "everyone is doing it." FOMO trades reliably identify market tops, not buying opportunities.

**The complete solution:**
→ Automate everything — removes emotional decisions entirely
→ Write Investment Policy Statement BEFORE next crash
→ Check portfolio maximum once monthly
→ Pre-mortem every position: what would prove my thesis wrong?`,
        quiz:[
          {q:"DALBAR behavior gap: investors earn roughly how much less than their funds?",opts:["0.1%","1.5-2.5%/year","5%","Same as fund"],ans:1},
          {q:"Loss aversion means losses feel:",opts:["Equally painful as gains","Slightly more","2-2.5x more painful than equal gains feel good","10x more painful"],ans:2},
          {q:"Confirmation bias means:",opts:["Confirming account details","Only seeking information supporting your existing view","Checking prices too often","Following analyst ratings"],ans:1},
          {q:"Most effective behavioral solution:",opts:["Check portfolio daily","Read financial news constantly","Automate monthly investing to remove emotional decisions","Only invest during corrections"],ans:2},
        ]},
      { id:"l502", no:2, emoji:"🧾", title:"Tax Strategy for Investors", mins:7,
        body:`Taxes are the largest cost most investors pay. Intelligent tax strategy adds 1-2% annual return without changing a single investment.

**Capital Gains Tax:**

**Short-term** (held <1 year): Taxed as ordinary income — 10% to 37%.
**Long-term** (held 12+ months): Special preferential rates:
→ 0% — income under $47,025 single / $94,050 married (2024)
→ 15% — most middle-class investors
→ 20% — high earners ($518,900+ single)

The math: $50,000 gain at 32% short-term = $16,000 tax. Same gain at 15% long-term = $7,500 tax. Holding ONE MORE DAY past 12 months saves $8,500.

**Tax-Loss Harvesting:**
Sell a position at a loss to offset capital gains. $20,000 in gains + $9,000 loss = pay tax on only $11,000.

**Wash sale rule:** Cannot buy "substantially identical" securities within 30 days before or after the loss sale. Sell VOO → wait 31 days, OR immediately buy IVV (different fund, same index).

**Tax-advantaged accounts:**

**Roth IRA:** After-tax in → 100% tax-free growth → 100% tax-free withdrawals. $7,000/year.
$7,000/year from 22-65 at 9% in Roth: ~$3.5M tax-free. Tax saved vs taxable account: ~$525,000.

**Traditional IRA/401k:** Tax deduction now → pay tax on withdrawal. Better if in high bracket today, expect lower bracket in retirement.

**HSA — Triple tax advantage:**
→ Contributions: tax-deductible
→ Growth: tax-free
→ Medical withdrawals: tax-free
Effectively a second Roth IRA for healthcare. Max $4,150/year individual (2024).

**Asset location strategy:**
→ Roth IRA: Highest-growth assets (maximize tax-free compounding)
→ Traditional IRA/401k: Bonds, REITs (shelter ordinary income)
→ Taxable: Tax-efficient ETFs (VOO, VTI — minimal turnover)`,
        quiz:[
          {q:"Long-term gains (12+ months) for most middle-class investors taxed at:",opts:["Same as income (up to 37%)","0%","15%","25%"],ans:2},
          {q:"Wash sale rule:",opts:["Can't sell at a loss","Can't buy substantially identical securities within 30 days of loss sale","Can't sell more than $3,000 in losses","Harvesting in Roth IRA"],ans:1},
          {q:"HSA has which tax advantage?",opts:["Single — just deductible","Double — deductible + growth","Triple — deductible, tax-free growth, AND tax-free medical withdrawals","No advantage"],ans:2},
          {q:"Asset location: highest-growth assets go in:",opts:["Taxable brokerage","Traditional IRA","HSA","Roth IRA — maximize tax-free compounding"],ans:3},
        ]},
      { id:"l503", no:3, emoji:"⚙️", title:"Dollar-Cost Averaging & Automation", mins:5,
        body:`The most powerful investing strategy requires zero stock-picking skill, zero market timing, and 15 minutes of setup. Consistently outperforms most active strategies.

**DCA defined:**
Invest a fixed dollar amount at regular intervals regardless of market price. $400/month in VOO. Every month on the 15th. Whether up, down, or sideways. No decision required.

**Why DCA mechanically improves average purchase price:**
Month 1: VOO at $500 → buy 0.80 shares
Month 2: VOO at $440 → buy 0.91 shares (cheaper = more shares automatically)
Month 3: VOO at $390 → buy 1.03 shares (even cheaper = even more)
Month 4: VOO at $460 → buy 0.87 shares
Month 5: VOO at $510 → buy 0.78 shares

Average cost: $455. Average market price: $460. You beat the average — without any skill.

**DCA vs Lump Sum:**
Vanguard research: lump sum beats DCA ~2/3 of the time over 12 months (markets go up more than down). BUT: DCA is psychologically superior, appropriate for regular income earners, and eliminates the catastrophic risk of investing everything right before a 40% crash.

**DCA compounding over time:**
$500/month at 10% average return:
→ Age 25-35: $102,000 (invested $60,000)
→ Age 25-45: $379,000 (invested $120,000)
→ Age 25-55: $1,137,000 (invested $180,000)
→ Age 25-65: $3,162,000 (invested $240,000)
$240,000 invested → $3,162,000. Compounding generated $2,922,000.

**Bear markets during DCA = gifts:**
You automatically buy more shares at lower prices. Investors who increased contributions during March 2020 bottom saw those positions double in 18 months.

Correct response to crash during DCA: keep going, or increase contributions.`,
        quiz:[
          {q:"DCA means:",opts:["Invest all money at once","Invest fixed amount at regular intervals regardless of price","Only invest when down 10%+","Diversify Different Country Assets"],ans:1},
          {q:"Markets crash 40% during DCA. The investor:",opts:["Should stop investing","Switch to bonds","Benefits — automatically buys more shares at lower prices","Takes a break"],ans:2},
          {q:"$500/month DCA at 10% for 40 years produces approximately:",opts:["$500,000","$1,000,000","$3,162,000","$240,000"],ans:2},
          {q:"Research shows lump sum beats DCA approximately what % of the time over 12 months:",opts:["33%","50%","67%","DCA always beats lump sum"],ans:2},
        ]},
      { id:"l504", no:4, emoji:"🏦", title:"Retirement Accounts Deep Dive", mins:7,
        body:`The accounts you use can matter as much as what you invest in. Tax advantages, properly used, are worth hundreds of thousands of dollars.

**The Complete Account Hierarchy:**

**STEP 1: 401(k) to full employer match**
Instant 50-100% return. ALWAYS do this first. Never leave free money behind.

**STEP 2: HSA (if eligible — requires HDHP)**
Triple tax advantage: deductible contributions + tax-free growth + tax-free medical withdrawals.
→ 2024: $4,150 individual / $8,300 family
→ Invest in index funds. Save medical receipts — reimburse yourself years later (no deadline).

**STEP 3: Roth IRA — max it**
$7,000/year. Most valuable account for most people under income limit.
Income limits: phase-out $146,000-$161,000 single / $230,000-$240,000 married.

**Backdoor Roth (for high earners):**
1. Contribute non-deductible to Traditional IRA ($7,000)
2. Immediately convert to Roth
3. Pay tax only on any growth (near zero if done immediately)
Legal. Commonly used by high-income professionals.

**STEP 4: Max the 401(k)**
$23,000/year ($30,500 if 50+).
$23,000/year for 30 years at 8% = ~$2.7M at retirement.

**Roth 401(k) vs Traditional 401(k):**
→ Low bracket now (under $89,075): Roth 401k usually better — pay low taxes now
→ High bracket now ($200k+): Traditional 401k usually better — big deduction now

**Required Minimum Distributions:**
Age 73: traditional IRAs and 401ks require annual minimum withdrawals. Roth IRAs have NO RMDs — money compounds tax-free indefinitely. Major estate planning advantage.

**The 59½ rule:**
Withdraw before 59½ from traditional accounts → 10% penalty + income tax.
Roth IRA CONTRIBUTIONS (not earnings) can be withdrawn anytime without penalty — functions as secondary emergency fund.`,
        quiz:[
          {q:"First retirement savings priority:",opts:["Max Roth IRA","Max Traditional IRA","401k to full employer match","Open taxable brokerage"],ans:2},
          {q:"HSA withdrawals for qualified medical expenses taxed at:",opts:["Regular income rate","15% capital gains","0% — completely tax-free","10% penalty + income tax"],ans:2},
          {q:"Roth IRA vs Traditional IRA: biggest estate planning advantage:",opts:["Higher contribution limits","Earlier withdrawal age","No Required Minimum Distributions — compounds indefinitely","Higher income limits"],ans:2},
          {q:"Backdoor Roth allows high earners to:",opts:["Avoid all taxes","Contribute more than $7,000","Convert non-deductible Traditional IRA to Roth","Avoid wash sale rule"],ans:2},
        ]},
      { id:"l505", no:5, emoji:"💎", title:"Building Long-Term Wealth", mins:6,
        body:`Wealth is built through consistent application of correct principles over long time horizons. Every great investor says the same thing.

**The Wealth Equation:**
(Income − Expenses) × Rate of Return × Time = Wealth

TIME is the compounding multiplier that overwhelms everything else. Starting 10 years earlier creates more wealth than doubling your savings rate.

**Savings rate — wildly underrated:**
At 10% return, $1,000/month → $2,279,000 after 30 years.
At 10% return, $2,000/month → $4,558,000 after 30 years.
Doubling your savings rate doubles final wealth. Early in your career: focus obsessively on income and savings rate.

**The FIRE movement / 4% Rule:**
Based on Trinity Study: safely withdraw 4%/year (inflation-adjusted) with very high probability of lasting 30+ years.

FIRE number = Annual expenses × 25
→ Live on $50,000/year → Need $1,250,000
→ Live on $80,000/year → Need $2,000,000
→ Live on $120,000/year → Need $3,000,000

**Wealth milestones:**
→ $50,000: Compounding becomes meaningful (~$5,000/year at 10%)
→ $100,000: The hardest. Charlie Munger: "Find a way. Walk everywhere if you must."
→ $500,000: Generates $50,000/year — more than many salaries
→ $1,000,000: Financial independence for most

**Rules to never break:**
✓ Never invest money needed within 3-5 years
✓ Never use margin until 5+ years experience + one bear market survived
✓ Never more than 10% in any single stock
✓ Never try to time market tops/bottoms
✓ Never panic-sell during corrections
✓ Never check portfolio more than monthly
✓ Never invest based on tips, social media, or FOMO`,
        quiz:[
          {q:"4% rule: portfolio needs to be how many times annual expenses?",opts:["10x","15x","25x","50x"],ans:2},
          {q:"$500,000 at 10%/year grows how much per year?",opts:["$5,000","$25,000","$50,000","$100,000"],ans:2},
          {q:"Early in career, highest-leverage wealth activity:",opts:["Picking best stocks","Maximizing savings rate and income","Using margin to amplify","Day trading"],ans:1},
          {q:"FIRE number to live on $90,000/year (4% rule):",opts:["$900,000","$1,800,000","$2,250,000","$3,600,000"],ans:2},
        ]},
      { id:"l506", no:6, emoji:"🏆", title:"Your Complete Investment Plan", mins:7,
        body:`You have completed the StockSense Academy. This is your complete, actionable playbook.

**Before investing a dollar:**
✓ Emergency fund: 3-6 months expenses in high-yield savings (~4.5-5% APY)
✓ High-interest debt eliminated: credit cards at 20%+ APR? Pay off first — guaranteed 20%+ return
✓ Adequate insurance: health, disability, term life (if dependents)

**Account setup (in priority order):**
1. 401(k) — at least to full employer match
2. Roth IRA at Fidelity — max $7,000/year
3. HSA if eligible — max it
4. Max 401(k) — $23,000/year
5. Taxable brokerage — anything beyond

**Your core portfolio:**

Simple (works perfectly for most):
→ 80% VTI + 15% VXUS + 5% BND

More complete:
→ 60% VTI · 20% VXUS · 10% BND · 5% VNQ · 5% individual stocks

**Automation checklist:**
✓ Automatic monthly bank transfer to brokerage on payday
✓ Automatic investment orders set up
✓ DRIP enabled on all positions
✓ Annual rebalancing calendar reminder

**Your Investment Policy Statement (write this now):**
"I am a long-term investor with a [X]-year horizon. My target allocation is [your allocation]. I will NOT sell during market corrections. I will continue monthly investments regardless of conditions. I will check my portfolio maximum once monthly. I will rebalance annually. Every bear market in US history fully recovered. My biggest enemy is my own emotional reactions."

**To reach $1M at 10% return:**
→ $200/month from age 25 → $1M by 60
→ $400/month from age 30 → $1M by 60
→ $1,000/month from age 40 → $1M by 60

Congratulations — you've completed StockSense Academy.

"The best time to plant a tree was 20 years ago. The second best time is now." 🌳`,
        quiz:[
          {q:"Correct account priority:",opts:["Roth IRA → 401k → HSA","401k to match → Roth IRA → HSA → Max 401k → Brokerage","Brokerage first","Traditional IRA → 401k"],ans:1},
          {q:"Investment Policy Statement primarily helps you:",opts:["Legal compliance","Pre-commit to rational behavior during market panics","Tax documentation","Employer requirements"],ans:1},
          {q:"At 10% return, $400/month from age 30 reaches $1M approximately at age:",opts:["45","50","55","60"],ans:3},
          {q:"Most important action after completing this academy:",opts:["Learn options first","Wait for next correction","Open your account and make your first automatic investment","Study 6 more months"],ans:2},
        ]},
    ]},
];

const STOCKS = [
  {ticker:"AAPL", name:"Apple Inc.",        base:189.30, sector:"Technology",    mktCap:"$2.9T", pe:28.4, wk52h:199.62, wk52l:164.08, desc:"Consumer electronics, software & services"},
  {ticker:"NVDA", name:"NVIDIA Corp.",       base:875.40, sector:"Semiconductors",mktCap:"$2.1T", pe:68.2, wk52h:974.00, wk52l:410.00, desc:"AI accelerators, GPUs & data centers"},
  {ticker:"MSFT", name:"Microsoft Corp.",    base:415.20, sector:"Technology",    mktCap:"$3.0T", pe:34.1, wk52h:430.82, wk52l:309.45, desc:"Cloud computing, productivity & AI"},
  {ticker:"TSLA", name:"Tesla Inc.",         base:248.70, sector:"EV & Energy",   mktCap:"$790B", pe:55.8, wk52h:278.98, wk52l:138.80, desc:"Electric vehicles & autonomous tech"},
  {ticker:"AMZN", name:"Amazon.com Inc.",    base:192.80, sector:"Consumer Tech",  mktCap:"$2.0T", pe:42.3, wk52h:201.20, wk52l:118.35, desc:"E-commerce, AWS cloud & advertising"},
  {ticker:"GOOGL",name:"Alphabet Inc.",      base:175.50, sector:"Technology",    mktCap:"$2.1T", pe:24.7, wk52h:193.31, wk52l:130.67, desc:"Search, YouTube, Google Cloud & AI"},
  {ticker:"JPM",  name:"JPMorgan Chase",     base:198.60, sector:"Finance",       mktCap:"$575B", pe:11.2, wk52h:205.88, wk52l:135.19, desc:"Investment banking & financial services"},
  {ticker:"VOO",  name:"Vanguard S&P 500",   base:498.70, sector:"ETF",           mktCap:"ETF",   pe:22.1, wk52h:525.12, wk52l:404.60, desc:"Tracks 500 largest US companies"},
  {ticker:"VTI",  name:"Vanguard Total Mkt", base:245.30, sector:"ETF",           mktCap:"ETF",   pe:21.8, wk52h:258.60, wk52l:198.90, desc:"Entire US stock market in one fund"},
  {ticker:"QQQ",  name:"Invesco NASDAQ-100", base:448.90, sector:"ETF",           mktCap:"ETF",   pe:31.5, wk52h:502.68, wk52l:340.00, desc:"Top 100 NASDAQ technology companies"},
];

function buildHistory(base) {
  let v = base * 0.94;
  return Array.from({length:80}, () => {
    v = Math.max(base*0.82, Math.min(base*1.18, v*(1+(Math.random()-0.487)*0.009)));
    return +v.toFixed(2);
  });
}

function MiniChart({history, up, w=68, h=28}) {
  if (!history||history.length<2) return null;
  const mn=Math.min(...history),mx=Math.max(...history),rng=mx-mn||1;
  const pts=history.map((v,i)=>`${(i/(history.length-1))*w},${h-(((v-mn)/rng)*h*0.85+h*0.075)}`).join(" ");
  const c=up?T.green:T.red;
  return (
    <svg width={w} height={h} style={{overflow:"visible",flexShrink:0}}>
      <defs><linearGradient id={`mc${up?1:0}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} stopOpacity="0.28"/><stop offset="100%" stopColor={c} stopOpacity="0"/></linearGradient></defs>
      <polyline points={`${pts} ${w},${h} 0,${h}`} fill={`url(#mc${up?1:0})`} stroke="none"/>
      <polyline points={pts} fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BigChart({history, up}) {
  const [hi,setHi]=useState(null);
  if (!history||history.length<2) return null;
  const W=800,H=160;
  const mn=Math.min(...history)*0.997,mx=Math.max(...history)*1.003,rng=mx-mn||1;
  const xs=history.map((_,i)=>(i/(history.length-1))*W);
  const ys=history.map(v=>H-(((v-mn)/rng)*H*0.88+H*0.06));
  const pts=history.map((_,i)=>`${xs[i]},${ys[i]}`).join(" ");
  const c=up?T.green:T.red;
  const idx=hi!==null?hi:history.length-1;
  return (
    <div style={{position:"relative",width:"100%",paddingBottom:"22%"}} onMouseLeave={()=>setHi(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
        style={{position:"absolute",inset:0,width:"100%",height:"100%",cursor:"crosshair"}}
        onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();setHi(Math.max(0,Math.min(history.length-1,Math.round(((e.clientX-r.left)/r.width)*(history.length-1)))));
        }}>
        <defs><linearGradient id="bcg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} stopOpacity="0.22"/><stop offset="100%" stopColor={c} stopOpacity="0"/></linearGradient></defs>
        <polyline points={`${pts} ${W},${H} 0,${H}`} fill="url(#bcg2)" stroke="none"/>
        <polyline points={pts} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {hi!==null&&<><line x1={xs[idx]} y1={0} x2={xs[idx]} y2={H} stroke={c} strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/><circle cx={xs[idx]} cy={ys[idx]} r="5" fill={c} stroke={T.bg} strokeWidth="2.5"/></>}
      </svg>
      {hi!==null&&<div style={{position:"absolute",top:6,left:"50%",transform:"translateX(-50%)",background:T.card2,border:`1px solid ${T.border2}`,borderRadius:7,padding:"3px 10px",fontSize:12,fontWeight:700,color:c,pointerEvents:"none"}}>${history[idx]}</div>}
    </div>
  );
}

export default function App() {
  const [screen,setScreen]=useState("splash");
  const [onboardSlide,setOnboardSlide]=useState(0);
  const [userName,setUserName]=useState("");
  const [nameInput,setNameInput]=useState("");
  const [tab,setTab]=useState("academy");
  const [sub,setSub]=useState(null);
  const [selChapter,setSelChapter]=useState(null);
  const [selLesson,setSelLesson]=useState(null);
  const [quizState,setQuizState]=useState(null);
  const [completed,setCompleted]=useState([]);
  const [xp,setXp]=useState(0);
  const [selStock,setSelStock]=useState(null);
  const [tfilt,setTfilt]=useState("1D");
  const [portfolio,setPortfolio]=useState({cash:10000,holdings:{}});
  const [tradeModal,setTradeModal]=useState(null);
  const [tradeQty,setTradeQty]=useState("");
  const [toast,setToast]=useState(null);
  const [aiData,setAiData]=useState({});
  const [aiLoading,setAiLoading]=useState(false);
  const [chatMsgs,setChatMsgs]=useState([]);
  const [chatInput,setChatInput]=useState("");
  const [chatLoading,setChatLoading]=useState(false);
  const [flashMap,setFlashMap]=useState({});
  const chatEndRef=useRef(null);
  const inputRef=useRef(null);
  const prevRef=useRef({});

  const [prices,setPrices]=useState(()=>{
    const p={};
    STOCKS.forEach(s=>{const h=buildHistory(s.base);p[s.ticker]={price:h[h.length-1],open:h[0],change:+(h[h.length-1]-h[0]).toFixed(2),pct:+((h[h.length-1]-h[0])/h[0]*100).toFixed(2),history:h,high:+(Math.max(...h)).toFixed(2),low:+(Math.min(...h)).toFixed(2)};});
    return p;
  });
  const portHistory=useMemo(()=>{let v=10000;return Array.from({length:60},()=>{v=Math.max(9200,Math.min(10900,v*(1+(Math.random()-0.48)*0.007)));return +v.toFixed(2);});},[]);

  useEffect(()=>{
    if(screen==="splash"){const t=setTimeout(()=>setScreen("onboard"),2800);return()=>clearTimeout(t);}
  },[screen]);

  useEffect(()=>{
    const t=setInterval(()=>{
      setPrices(prev=>{
        const n={},fl={};
        STOCKS.forEach(s=>{
          const old=prev[s.ticker];const last=old.history[old.history.length-1];
          const np=Math.max(s.base*0.84,+(last*(1+(Math.random()-0.487)*0.005)).toFixed(2));
          const nh=[...old.history.slice(1),np];const ch=+(np-old.open).toFixed(2);const pct=+((ch/old.open)*100).toFixed(2);
          n[s.ticker]={...old,price:np,change:ch,pct,history:nh,high:Math.max(old.high,np),low:Math.min(old.low,np)};
          if(prevRef.current[s.ticker]&&np!==prevRef.current[s.ticker])fl[s.ticker]=np>prevRef.current[s.ticker]?"up":"dn";
        });
        prevRef.current=Object.fromEntries(STOCKS.map(s=>[s.ticker,n[s.ticker].price]));
        if(Object.keys(fl).length){setFlashMap(fl);setTimeout(()=>setFlashMap({}),500);}
        return n;
      });
    },3000);
    return()=>clearInterval(t);
  },[]);

  useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:"smooth"});},[chatMsgs,chatLoading]);

  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),2800);};

  const holdingsVal=Object.entries(portfolio.holdings).reduce((a,[t,q])=>{const p=prices[t];const s=STOCKS.find(s=>s.ticker===t);return a+(p?p.price*q:(s?.base||0)*q);},0);
  const netWorth=+(portfolio.cash+holdingsVal).toFixed(2);
  const pnl=+(netWorth-10000).toFixed(2);
  const pnlPct=+((pnl/10000)*100).toFixed(2);
  const pnlUp=pnl>=0;
  const totalLessons=CHAPTERS.reduce((a,c)=>a+c.lessons.length,0);

  function executeTrade(type){
    const {stock}=tradeModal;const qty=parseInt(tradeQty);
    if(!qty||qty<1){showToast("Enter a valid quantity",false);return;}
    const p=prices[stock.ticker];const cost=+(p.price*qty).toFixed(2);
    if(type==="buy"){
      if(cost>portfolio.cash){showToast("Insufficient funds",false);return;}
      setPortfolio(prev=>({cash:+(prev.cash-cost).toFixed(2),holdings:{...prev.holdings,[stock.ticker]:(prev.holdings[stock.ticker]||0)+qty}}));
      showToast(`Bought ${qty} share${qty>1?"s":""} of ${stock.ticker}`);
    } else {
      const held=portfolio.holdings[stock.ticker]||0;
      if(qty>held){showToast("Insufficient shares",false);return;}
      setPortfolio(prev=>({cash:+(prev.cash+cost).toFixed(2),holdings:{...prev.holdings,[stock.ticker]:held-qty}}));
      showToast(`Sold ${qty} share${qty>1?"s":""} of ${stock.ticker}`);
    }
    setTradeModal(null);setTradeQty("");
  }

  async function loadAI(stock){
    setSelStock(stock);setAiLoading(true);setSub("ai");
    if(aiData[stock.ticker]){setAiLoading(false);return;}
    const p=prices[stock.ticker];
    try{
      const content=await callGroq(
        [{role:"user",content:`Analyze ${stock.name} (${stock.ticker}). Price: $${p?.price}. Today: ${p?.pct>=0?"+":""}${p?.pct}%. Sector: ${stock.sector}. P/E: ${stock.pe}. 52w range: $${stock.wk52l}–$${stock.wk52h}.`}],
        ANALYSIS_SYS
      );
      setAiData(prev=>({...prev,[stock.ticker]:content}));
    } catch(err){
      setAiData(prev=>({...prev,[stock.ticker]:`Analysis unavailable: ${err.message}`}));
    }
    setAiLoading(false);
  }

  async function sendChat(){
    const msg=chatInput.trim();if(!msg||chatLoading)return;
    const updated=[...chatMsgs,{role:"user",content:msg}];
    setChatMsgs(updated);setChatInput("");setChatLoading(true);
    try{
      const reply=await callGroq(updated,ADVISOR_SYS);
      setChatMsgs([...updated,{role:"assistant",content:reply}]);
    } catch(err){
      setChatMsgs([...updated,{role:"assistant",content:`Error: ${err.message}. Please try again.`}]);
    }
    setChatLoading(false);
  }

  function answerQuiz(idx){
    const q=selLesson.quiz[quizState.step];const correct=idx===q.ans;
    const newA=[...quizState.answers,{idx,correct}];const newS=quizState.score+(correct?1:0);
    if(quizState.step<selLesson.quiz.length-1){setQuizState({...quizState,step:quizState.step+1,answers:newA,score:newS});}
    else{
      if(!completed.includes(selLesson.id)){const gained=25+(newS===selLesson.quiz.length?15:0);setXp(p=>p+gained);setCompleted(p=>[...p,selLesson.id]);showToast(`+${gained} XP — Lesson complete!`);}
      setQuizState({...quizState,done:true,answers:newA,score:newS});
    }
  }

  function renderMD(text){
    return text.split("\n").map((line,i)=>{
      if(!line.trim())return <div key={i} style={{height:6}}/>;
      const bullet=line.startsWith("→")||line.startsWith("✓")||line.startsWith("❌");
      const parts=line.split(/(\*\*[^*]+\*\*)/g).map((p,j)=>p.startsWith("**")?<span key={j} style={{color:T.white,fontWeight:700}}>{p.replace(/\*\*/g,"")}</span>:p);
      return <p key={i} style={{marginBottom:bullet?3:7,lineHeight:1.76,color:T.g1,fontSize:14,paddingLeft:bullet?8:0}}>{parts}</p>;
    });
  }

  const completedInCh=(ch)=>ch.lessons.filter(l=>completed.includes(l.id)).length;
  const NAV=[
    {id:"academy",label:"Academy",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>},
    {id:"markets",label:"Markets",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>},
    {id:"practice",label:"Practice",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>},
    {id:"brokers",label:"Invest",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>},
    {id:"advisor",label:"Advisor",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>},
  ];

  // ── SPLASH ──
  if(screen==="splash")return(
    <>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{background:#080808;}@keyframes logoIn{0%{opacity:0;transform:scale(0.7)}60%{opacity:1;transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}@keyframes tagIn{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:1}}`}</style>
      <div style={{minHeight:"100vh",background:"#080808",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:T.font,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle,${T.greenGlow} 0%,transparent 70%)`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        <div style={{animation:"logoIn 0.8s cubic-bezier(0.34,1.56,0.64,1) both",textAlign:"center"}}>
          <div style={{fontSize:72,marginBottom:16}}>📈</div>
          <div style={{color:T.white,fontSize:38,fontWeight:800,letterSpacing:-1.5}}>StockSense</div>
          <div style={{color:T.green,fontSize:15,fontWeight:600,letterSpacing:2,textTransform:"uppercase",marginTop:8,animation:"tagIn 0.6s ease 0.6s both"}}>Learn · Practice · Invest</div>
        </div>
        <div style={{position:"absolute",bottom:60,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6}}>
          {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:T.green,animation:`pulse 1.4s ease ${i*0.2}s infinite`}}/>)}
        </div>
      </div>
    </>
  );

  // ── ONBOARDING ──
  if(screen==="onboard"){
    const slides=[
      {icon:"🎓",color:T.green,title:"Learn From Zero",subtitle:"The world's most complete\nstock market education",desc:"30 deep lessons across 5 chapters — from what a stock is to options, tax strategy, and portfolio construction.",features:[{icon:"📚",text:"5 chapters · 30 deep lessons"},{icon:"✅",text:"Quizzes after every lesson"},{icon:"⚡",text:"Earn XP as you progress"}],
        visual:<div style={{background:T.card,borderRadius:20,padding:"16px 18px",border:`1px solid ${T.green}30`}}>{[{icon:"🌱",t:"Foundations",p:100},{icon:"⚙️",t:"Market Mechanics",p:60},{icon:"🎯",t:"Analysis Methods",p:20},{icon:"🧠",t:"Advanced Instruments",p:0}].map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:i<3?12:0}}><span style={{fontSize:16}}>{c.icon}</span><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{color:T.white,fontSize:12,fontWeight:600}}>{c.t}</span><span style={{color:c.p>0?T.green:T.g2,fontSize:11,fontWeight:700}}>{c.p}%</span></div><div style={{height:4,background:T.border2,borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${c.p}%`,background:T.green,borderRadius:99}}/></div></div></div>)}</div>},
      {icon:"💰",color:T.blue,title:"Practice Safely",subtitle:"$10,000 of fake money\nto trade risk-free",desc:"Apply what you learn immediately. Buy and sell real stocks at real prices — with zero real money at risk.",features:[{icon:"📈",text:"Live simulated prices · updates every 3s"},{icon:"🛒",text:"Full buy/sell order system"},{icon:"💼",text:"Portfolio tracking & P&L"}],
        visual:<div style={{background:T.card,borderRadius:20,padding:"16px 18px",border:`1px solid ${T.blue}30`}}><div style={{textAlign:"center",marginBottom:12}}><div style={{color:T.g2,fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:3}}>Paper Portfolio</div><div style={{color:T.white,fontSize:32,fontWeight:700,letterSpacing:-1}}>$12,847.50</div><div style={{display:"inline-block",background:T.greenDim,borderRadius:50,padding:"3px 12px",color:T.green,fontWeight:700,fontSize:12,marginTop:5}}>▲ $2,847.50 (+28.4%)</div></div>{[{t:"NVDA",v:"$8,754",u:true,p:"+142%"},{t:"VOO",v:"$2,993",u:true,p:"+8.2%"},{t:"TSLA",v:"$1,100",u:false,p:"-12.1%"}].map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:i>0?8:0,marginTop:i>0?8:0,borderTop:i>0?`1px solid ${T.border}`:undefined}}><span style={{color:T.white,fontWeight:600,fontSize:13}}>{s.t}</span><div style={{textAlign:"right"}}><div style={{color:T.white,fontWeight:700,fontSize:13}}>{s.v}</div><div style={{color:s.u?T.green:T.red,fontSize:11,fontWeight:700}}>{s.p}</div></div></div>)}</div>},
      {icon:"🚀",color:T.orange,title:"Invest For Real",subtitle:"Guided path to your\nfirst real investment",desc:"When ready, StockSense guides you to the most trusted brokers with step-by-step account setup.",features:[{icon:"🏦",text:"Trusted broker recommendations"},{icon:"🤖",text:"AI Advisor — ask anything"},{icon:"📊",text:"Live market prices & AI analysis"}],
        visual:<div style={{background:T.card,borderRadius:20,padding:"16px 18px",border:`1px solid ${T.orange}30`}}>{[{name:"Fidelity",emoji:"🏦",tag:"Best Overall",color:T.green},{name:"Schwab",emoji:"🏛️",tag:"Best Support",color:T.blue},{name:"Vanguard",emoji:"📊",tag:"Index Funds",color:T.orange},{name:"Robinhood",emoji:"📱",tag:"Most Simple",color:T.purple}].map((b,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:i<3?12:0}}><div style={{width:34,height:34,borderRadius:10,background:T.card2,border:`1px solid ${T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{b.emoji}</div><div style={{flex:1}}><div style={{color:T.white,fontWeight:700,fontSize:13}}>{b.name}</div><div style={{color:T.g2,fontSize:11}}>$0 min · Commission free</div></div><div style={{background:b.color+"18",borderRadius:50,padding:"3px 8px",color:b.color,fontSize:10,fontWeight:700}}>{b.tag}</div></div>)}</div>},
    ];
    const slide=slides[onboardSlide];
    return(
      <>
        <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{background:#080808;}@keyframes sIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}`}</style>
        <div style={{minHeight:"100vh",background:"#080808",fontFamily:T.font,display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"flex-end",padding:"20px 20px 0"}}>
            <button onClick={()=>setScreen("profile")} style={{background:"none",border:"none",color:T.g2,fontSize:13,cursor:"pointer",fontFamily:T.font}}>Skip →</button>
          </div>
          <div style={{flex:1,padding:"16px 22px",display:"flex",flexDirection:"column",animation:"sIn 0.3s ease"}}>
            <div style={{fontSize:50,marginBottom:16,textAlign:"center"}}>{slide.icon}</div>
            <div style={{color:T.white,fontSize:28,fontWeight:800,letterSpacing:-0.5,lineHeight:1.2,marginBottom:6,textAlign:"center"}}>{slide.title}</div>
            <div style={{color:slide.color,fontSize:15,fontWeight:600,lineHeight:1.4,marginBottom:12,textAlign:"center",whiteSpace:"pre-line"}}>{slide.subtitle}</div>
            <div style={{color:T.g2,fontSize:14,lineHeight:1.65,marginBottom:20,textAlign:"center"}}>{slide.desc}</div>
            {slide.visual}
            <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:8}}>
              {slide.features.map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:30,height:30,borderRadius:9,background:slide.color+"18",border:`1px solid ${slide.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{f.icon}</div><span style={{color:T.g1,fontSize:13}}>{f.text}</span></div>)}
            </div>
          </div>
          <div style={{padding:"14px 22px 40px"}}>
            <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:18}}>
              {slides.map((_,i)=><div key={i} onClick={()=>setOnboardSlide(i)} style={{width:i===onboardSlide?24:8,height:8,borderRadius:99,background:i===onboardSlide?slide.color:T.border2,transition:"all 0.3s",cursor:"pointer"}}/>)}
            </div>
            {onboardSlide<slides.length-1
              ?<button onClick={()=>setOnboardSlide(onboardSlide+1)} style={{width:"100%",background:slide.color,border:"none",borderRadius:14,padding:"16px",color:"#000",fontWeight:800,fontSize:16,cursor:"pointer",fontFamily:T.font}}>Next →</button>
              :<button onClick={()=>setScreen("profile")} style={{width:"100%",background:`linear-gradient(135deg,${T.green},#00a86b)`,border:"none",borderRadius:14,padding:"16px",color:"#000",fontWeight:800,fontSize:16,cursor:"pointer",fontFamily:T.font}}>Get Started →</button>}
          </div>
        </div>
      </>
    );
  }

  // ── PROFILE ──
  if(screen==="profile")return(
    <>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{background:#080808;}@keyframes fUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}input::placeholder{color:#555;}`}</style>
      <div style={{minHeight:"100vh",background:"#080808",fontFamily:T.font,display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto",padding:"0 22px"}}>
        <div style={{paddingTop:56,animation:"fUp 0.4s ease"}}>
          <div style={{fontSize:50,marginBottom:20,textAlign:"center"}}>👋</div>
          <div style={{color:T.white,fontSize:30,fontWeight:800,letterSpacing:-1,lineHeight:1.2,marginBottom:8,textAlign:"center"}}>Welcome to<br/>StockSense</div>
          <div style={{color:T.g2,fontSize:14,lineHeight:1.6,textAlign:"center",maxWidth:300,margin:"0 auto 32px"}}>Your complete stock market education and practice platform. Let's personalize your experience.</div>
          <div style={{marginBottom:28}}>
            <div style={{color:T.g2,fontSize:11,fontWeight:700,letterSpacing:1.8,textTransform:"uppercase",marginBottom:10}}>Your First Name</div>
            <input value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&nameInput.trim()&&(setUserName(nameInput.trim()),setScreen("main"))} placeholder="Enter your name…" autoFocus
              style={{width:"100%",background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:"15px 16px",fontSize:18,color:T.white,outline:"none",fontFamily:T.font,fontWeight:600}}/>
          </div>
          <div style={{background:T.card,borderRadius:18,padding:"18px",border:`1px solid ${T.border2}`,marginBottom:28}}>
            <div style={{color:T.white,fontWeight:700,fontSize:13,marginBottom:12}}>What you'll get:</div>
            {[{icon:"📚",color:T.green,text:"30 deep lessons from zero to advanced"},{icon:"💰",color:T.blue,text:"$10,000 paper money to practice trading"},{icon:"📈",color:T.orange,text:"Live simulated market with 10 stocks"},{icon:"🤖",color:T.purple,text:"AI advisor — ask anything, anytime"},{icon:"🏦",color:T.gold,text:"Trusted broker guide for real investing"}].map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:11,marginBottom:i<4?11:0}}>
                <div style={{width:32,height:32,borderRadius:9,background:f.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{f.icon}</div>
                <span style={{color:T.g1,fontSize:13,lineHeight:1.4}}>{f.text}</span>
              </div>
            ))}
          </div>
          <button onClick={()=>{if(nameInput.trim()){setUserName(nameInput.trim());setScreen("main");}}} disabled={!nameInput.trim()}
            style={{width:"100%",background:nameInput.trim()?`linear-gradient(135deg,${T.green},#00a86b)`:"#1a1a1a",border:`1px solid ${nameInput.trim()?T.green:T.border2}`,borderRadius:14,padding:"16px",color:nameInput.trim()?"#000":T.g2,fontWeight:800,fontSize:16,cursor:nameInput.trim()?"pointer":"not-allowed",fontFamily:T.font,transition:"all 0.2s"}}>
            {nameInput.trim()?`Start Learning, ${nameInput.trim()} →`:"Enter your name to continue"}
          </button>
          <div style={{textAlign:"center",marginTop:14,color:T.g2,fontSize:12}}>No account needed · Free · Educational only</div>
        </div>
      </div>
    </>
  );

  // ── MAIN APP SCREENS ──
  const renderAcademy=()=>(
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{color:T.g2,fontSize:12,marginBottom:1}}>Welcome back,</div>
        <div style={{color:T.white,fontSize:26,fontWeight:700,letterSpacing:-0.5,marginBottom:3}}>{userName} 👋</div>
        <div style={{color:T.g2,fontSize:13,marginBottom:20}}>30 deep lessons · From zero to investor</div>
        <div style={{background:T.card,borderRadius:18,padding:"16px",border:`1px solid ${T.border2}`,marginBottom:22}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
            <div><div style={{color:T.white,fontWeight:700,fontSize:14}}>Your Progress</div><div style={{color:T.g2,fontSize:12,marginTop:1}}>{completed.length}/{totalLessons} lessons · {xp} XP</div></div>
            <div style={{background:T.greenDim,border:`1px solid ${T.green}30`,borderRadius:50,padding:"4px 12px",color:T.green,fontWeight:700,fontSize:12}}>{Math.round(completed.length/totalLessons*100)}%</div>
          </div>
          <div style={{height:6,background:T.border2,borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(completed.length/totalLessons)*100}%`,background:`linear-gradient(90deg,${T.green},#00a86b)`,borderRadius:99,transition:"width .5s"}}/>
          </div>
        </div>
      </div>
      {CHAPTERS.map(ch=>{
        const done=completedInCh(ch);
        return(
          <div key={ch.id} style={{padding:"0 20px",marginBottom:16}}>
            <div onClick={()=>{setSelChapter(ch);setSub("chapter");}} style={{background:T.card,borderRadius:20,padding:"16px",border:`1px solid ${ch.color}28`,cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:12}}>
                <div style={{width:48,height:48,borderRadius:14,background:ch.dim,border:`1px solid ${ch.color}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{ch.icon}</div>
                <div style={{flex:1}}>
                  <div style={{color:T.white,fontWeight:700,fontSize:14}}>Chapter {ch.no}: {ch.title}</div>
                  <div style={{color:T.g2,fontSize:12,marginTop:2}}>{ch.subtitle} · {ch.lessons.length} lessons</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:ch.color,fontSize:13,fontWeight:700}}>{done}/{ch.lessons.length}</div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.g2} strokeWidth="2" style={{marginTop:3}}><path d="M9 18l6-6-6-6"/></svg>
                </div>
              </div>
              <div style={{height:4,background:T.border2,borderRadius:99,overflow:"hidden",marginBottom:10}}>
                <div style={{height:"100%",width:`${(done/ch.lessons.length)*100}%`,background:ch.color,borderRadius:99,transition:"width .5s"}}/>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {ch.lessons.map(l=><div key={l.id} style={{background:completed.includes(l.id)?ch.dim:T.border,borderRadius:50,padding:"2px 9px",fontSize:10,color:completed.includes(l.id)?ch.color:T.g2,fontWeight:600}}>{completed.includes(l.id)?"✓ ":""}{l.emoji} {l.title.split(" ").slice(0,2).join(" ")}</div>)}
              </div>
            </div>
          </div>
        );
      })}
      <div style={{height:20}}/>
    </div>
  );

  const renderChapter=()=>{
    const ch=selChapter;if(!ch)return null;
    return(
      <div>
        <div style={{display:"flex",alignItems:"center",gap:11,padding:"16px 20px 0",marginBottom:18}}>
          <button onClick={()=>setSub(null)} style={{background:"none",border:"none",color:T.g1,cursor:"pointer",padding:0,fontFamily:T.font,display:"flex",alignItems:"center",gap:5,fontSize:14}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{width:36,height:36,borderRadius:11,background:ch.dim,border:`1px solid ${ch.color}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{ch.icon}</div>
          <div><div style={{color:T.white,fontWeight:700,fontSize:15}}>Chapter {ch.no}</div><div style={{color:ch.color,fontSize:12,fontWeight:600}}>{ch.title}</div></div>
        </div>
        <div style={{padding:"0 20px 24px"}}>
          {ch.lessons.map((l,i)=>{
            const done=completed.includes(l.id);
            return(
              <div key={l.id}>
                <div onClick={()=>{setSelLesson(l);setSub("lesson");}} style={{display:"flex",alignItems:"center",gap:13,padding:"15px 0",cursor:"pointer"}}>
                  <div style={{width:46,height:46,borderRadius:13,background:done?ch.dim:T.card,border:`1px solid ${done?ch.color:T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>
                    {done?<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>:l.emoji}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{color:done?ch.color:T.white,fontWeight:600,fontSize:14}}>{l.title}</div>
                    <div style={{color:T.g2,fontSize:12,marginTop:2}}>{l.mins} min · Lesson {ch.no}.{l.no}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.g2} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </div>
                {i<ch.lessons.length-1&&<div style={{height:1,background:T.border,marginLeft:59}}/>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLesson=()=>{
    const l=selLesson;if(!l)return null;
    const ch=CHAPTERS.find(c=>c.lessons.some(x=>x.id===l.id));
    const done=completed.includes(l.id);
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px"}}>
          <button onClick={()=>setSub("chapter")} style={{background:"none",border:"none",color:T.g1,cursor:"pointer",padding:0,fontFamily:T.font,display:"flex",alignItems:"center",gap:5,fontSize:14}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{color:ch?.color,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{ch?.title} · {l.mins} min</div>
          {done?<div style={{color:T.green,fontSize:12,fontWeight:700}}>✓ Done</div>:<div style={{width:40}}/>}
        </div>
        <div style={{padding:"4px 20px 32px"}}>
          <div style={{fontSize:38,marginBottom:10}}>{l.emoji}</div>
          <div style={{color:T.white,fontSize:22,fontWeight:700,letterSpacing:-0.3,lineHeight:1.2,marginBottom:6}}>{l.title}</div>
          <div style={{height:1,background:T.border,margin:"14px 0"}}/>
          {renderMD(l.body)}
          <div style={{height:1,background:T.border,margin:"22px 0"}}/>
          <button onClick={()=>{setQuizState({step:0,answers:[],score:0,done:false});setSub("quiz");}}
            style={{width:"100%",background:ch?.color||T.green,border:"none",borderRadius:13,padding:"15px",color:"#000",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:T.font}}>
            {done?"Retake Quiz →":"Take Quiz to Complete →"}
          </button>
        </div>
      </div>
    );
  };

  const renderQuiz=()=>{
    const l=selLesson;const qs=quizState;if(!l||!qs)return null;
    const ch=CHAPTERS.find(c=>c.lessons.some(x=>x.id===l.id));
    if(qs.done){
      const perfect=qs.score===l.quiz.length;
      return(
        <div style={{padding:"36px 20px",textAlign:"center"}}>
          <div style={{width:70,height:70,borderRadius:"50%",background:perfect?T.greenDim:T.card,border:`2px solid ${perfect?T.green:T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
            {perfect?<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>:<span style={{fontSize:28}}>📝</span>}
          </div>
          <div style={{color:T.white,fontSize:24,fontWeight:700,marginBottom:3}}>{perfect?"Perfect!":"Complete"}</div>
          <div style={{color:perfect?T.green:T.gold,fontSize:17,fontWeight:700,marginBottom:4}}>{qs.score}/{l.quiz.length} correct</div>
          <div style={{color:T.g2,fontSize:13,marginBottom:22}}>+{25+(perfect?15:0)} XP earned</div>
          {l.quiz.map((q,i)=>{const a=qs.answers[i];return(
            <div key={i} style={{background:T.card,borderRadius:12,padding:"12px 14px",marginBottom:9,textAlign:"left",border:`1px solid ${a?.correct?T.green+"50":T.red+"50"}`}}>
              <div style={{color:T.g2,fontSize:12,marginBottom:4}}>Q{i+1}: {q.q}</div>
              <div style={{color:a?.correct?T.green:T.red,fontWeight:600,fontSize:13}}>{a?.correct?"✓":"✗"} {q.opts[a?.idx??0]}</div>
              {!a?.correct&&<div style={{color:T.g2,fontSize:12,marginTop:2}}>Correct: {q.opts[q.ans]}</div>}
            </div>
          );})}
          <div style={{display:"flex",gap:10,marginTop:8}}>
            <button onClick={()=>setSub("chapter")} style={{flex:1,background:T.card,border:`1px solid ${T.border2}`,borderRadius:12,padding:"13px",color:T.white,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:T.font}}>Back</button>
            <button onClick={()=>setSub("lesson")} style={{flex:1,background:ch?.color||T.green,border:"none",borderRadius:12,padding:"13px",color:"#000",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:T.font}}>Re-read →</button>
          </div>
        </div>
      );
    }
    const q=l.quiz[qs.step];
    return(
      <div style={{padding:"20px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <button onClick={()=>setSub("lesson")} style={{background:"none",border:"none",color:T.g1,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:14,padding:0,fontFamily:T.font}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{color:T.g2,fontSize:13}}>{qs.step+1} / {l.quiz.length}</div>
        </div>
        <div style={{height:4,background:T.border2,borderRadius:99,overflow:"hidden",marginBottom:26}}>
          <div style={{height:"100%",width:`${(qs.step/l.quiz.length)*100}%`,background:ch?.color||T.green,borderRadius:99,transition:"width .3s"}}/>
        </div>
        <div style={{color:T.white,fontSize:18,fontWeight:700,lineHeight:1.45,marginBottom:26}}>{q.q}</div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {q.opts.map((opt,i)=>(
            <button key={i} onClick={()=>answerQuiz(i)} style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:13,padding:"15px 16px",textAlign:"left",color:T.white,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:11,fontFamily:T.font}}>
              <span style={{width:26,height:26,borderRadius:"50%",border:`1.5px solid ${T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:T.g2,flexShrink:0}}>{String.fromCharCode(65+i)}</span>
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderMarkets=()=>(
    <div>
      <div style={{padding:"20px 20px 13px",display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div><div style={{color:T.g2,fontSize:11,fontWeight:700,letterSpacing:1.8,textTransform:"uppercase",marginBottom:3}}>Live Market</div><div style={{color:T.white,fontSize:24,fontWeight:700,letterSpacing:-0.5}}>Stocks & ETFs</div></div>
        <div style={{display:"flex",alignItems:"center",gap:5,background:T.greenDim,border:`1px solid ${T.green}30`,borderRadius:50,padding:"5px 11px"}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:T.green,animation:"pulse 2s infinite"}}/>
          <span style={{color:T.green,fontSize:11,fontWeight:600}}>Live · 3s</span>
        </div>
      </div>
      {STOCKS.map((s,i)=>{
        const p=prices[s.ticker];const up=(p?.pct||0)>=0;const fl=flashMap[s.ticker];
        const held=portfolio.holdings[s.ticker]||0;
        return(
          <div key={s.ticker}>
            <div onClick={()=>{setSelStock(s);setSub("stock");}} style={{display:"flex",alignItems:"center",gap:13,padding:"13px 20px",cursor:"pointer"}}>
              <div style={{width:42,height:42,borderRadius:12,background:T.card2,border:`1px solid ${T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:up?T.green:T.g1,flexShrink:0}}>{s.ticker.slice(0,4)}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:T.white,fontWeight:600,fontSize:13}}>{s.ticker}{held>0&&<span style={{color:T.green,fontSize:9,background:T.greenDim,borderRadius:4,padding:"1px 5px",marginLeft:6}}>●</span>}</div>
                <div style={{color:T.g2,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</div>
              </div>
              <MiniChart history={p?.history} up={up} w={58} h={25}/>
              <div style={{textAlign:"right",minWidth:76}}>
                <div style={{color:fl?(fl==="up"?T.green:T.red):T.white,fontWeight:700,fontSize:14,fontVariantNumeric:"tabular-nums",transition:"color 0.4s"}}>${p?.price||s.base}</div>
                <div style={{color:up?T.green:T.red,fontSize:12,fontWeight:600,marginTop:1}}>{up?"+":""}{p?.pct||0}%</div>
              </div>
            </div>
            {i<STOCKS.length-1&&<div style={{height:1,background:T.border,marginLeft:75}}/>}
          </div>
        );
      })}
      <div style={{height:20}}/>
    </div>
  );

  const renderStock=()=>{
    const s=selStock;if(!s)return null;
    const p=prices[s.ticker];const up=(p?.pct||0)>=0;const c=up?T.green:T.red;
    const held=portfolio.holdings[s.ticker]||0;
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px"}}>
          <button onClick={()=>setSub(null)} style={{background:"none",border:"none",color:T.g1,cursor:"pointer",padding:0,fontFamily:T.font,display:"flex",alignItems:"center",gap:5,fontSize:14}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{color:T.white,fontWeight:600,fontSize:14}}>{s.ticker}</div>
          <div style={{width:36}}/>
        </div>
        <div style={{padding:"0 20px 10px"}}>
          <div style={{color:T.g2,fontSize:13,marginBottom:3}}>{s.name}</div>
          <div style={{color:T.white,fontSize:42,fontWeight:700,letterSpacing:-1.5,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>${p?.price||s.base}</div>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,marginTop:9,background:up?T.greenDim:T.redDim,borderRadius:8,padding:"5px 11px"}}>
            <span style={{color:c,fontWeight:700,fontSize:14}}>{up?"+":""}${Math.abs(p?.change||0).toFixed(2)}</span>
            <span style={{color:T.g2}}>·</span>
            <span style={{color:c,fontWeight:700,fontSize:14}}>{up?"+":""}{p?.pct||0}%</span>
          </div>
        </div>
        <BigChart history={p?.history} up={up}/>
        <div style={{display:"flex",justifyContent:"center",gap:3,padding:"7px 20px 4px"}}>
          {["1D","1W","1M","3M","1Y"].map(f=><button key={f} onClick={()=>setTfilt(f)} style={{background:tfilt===f?T.greenDim:"transparent",border:tfilt===f?`1px solid ${T.green}`:"1px solid transparent",borderRadius:50,padding:"4px 11px",color:tfilt===f?T.green:T.g2,fontSize:12,fontWeight:tfilt===f?700:400,cursor:"pointer"}}>{f}</button>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,margin:"13px 20px",background:T.border,borderRadius:15,overflow:"hidden"}}>
          {[["Open",`$${p?.open||s.base}`],["High",`$${p?.high||s.base}`],["Low",`$${p?.low||s.base}`],["Mkt Cap",s.mktCap],["52W High",`$${s.wk52h}`],["52W Low",`$${s.wk52l}`],["P/E",s.pe],["Sector",s.sector]].map(([l,v])=>(
            <div key={l} style={{background:T.card,padding:"12px 14px"}}>
              <div style={{color:T.g2,fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:3}}>{l}</div>
              <div style={{color:T.white,fontWeight:600,fontSize:13}}>{v}</div>
            </div>
          ))}
        </div>
        {held>0&&<div style={{margin:"0 20px 12px",background:T.card,borderRadius:14,padding:"14px",border:`1px solid ${T.green}25`}}>
          <div style={{color:T.green,fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:7}}>Your Position</div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div><div style={{color:T.white,fontWeight:700,fontSize:17}}>{held} share{held>1?"s":""}</div><div style={{color:T.g2,fontSize:12}}>@ ${p?.price||s.base}/share</div></div>
            <div style={{textAlign:"right"}}><div style={{color:T.white,fontWeight:700,fontSize:17}}>${+(held*(p?.price||s.base)).toFixed(2)}</div></div>
          </div>
        </div>}
        <div style={{margin:"0 20px 7px"}}>
          <button onClick={()=>loadAI(s)} style={{width:"100%",background:T.card2,border:`1px solid ${T.border2}`,borderRadius:13,padding:"13px",color:T.white,fontWeight:600,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:T.font}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            AI Analysis
          </button>
        </div>
        <div style={{display:"flex",gap:10,padding:"0 20px 26px"}}>
          <button onClick={()=>{setTradeModal({stock:s,mode:"buy"});setTradeQty("");}} style={{flex:1,background:T.green,border:"none",borderRadius:13,padding:"15px",color:"#000",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:T.font}}>Buy</button>
          <button onClick={()=>{setTradeModal({stock:s,mode:"sell"});setTradeQty("");}} style={{flex:1,background:"transparent",border:`2px solid ${T.border2}`,borderRadius:13,padding:"15px",color:T.white,fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:T.font}}>Sell</button>
        </div>
      </div>
    );
  };

  const renderAI=()=>{
    const s=selStock;if(!s)return null;
    const p=prices[s.ticker];const up=(p?.pct||0)>=0;
    const analysis=aiData[s.ticker]||"";
    const sColors={VERDICT:T.green,SAFETY:T.gold,DISCLAIMER:T.g2};
    const sBg={VERDICT:T.greenDim,SAFETY:T.goldDim,DISCLAIMER:T.card};
    const sections=analysis.split("\n").filter(l=>l.trim()).reduce((acc,line)=>{
      const m=line.match(/^([A-Z ]+):\s*(.*)/);
      if(m)acc.push({label:m[1].trim(),content:m[2].trim()});
      else if(acc.length>0)acc[acc.length-1].content+=" "+line;
      return acc;
    },[]);
    return(
      <div>
        <div style={{padding:"16px 20px 18px"}}>
          <button onClick={()=>setSub("stock")} style={{background:"none",border:"none",color:T.g1,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:14,padding:0,fontFamily:T.font}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            {s.ticker}
          </button>
        </div>
        <div style={{padding:"0 20px"}}>
          <div style={{color:T.green,fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>AI Analysis</div>
          <div style={{color:T.white,fontSize:21,fontWeight:700,marginBottom:2}}>{s.name}</div>
          <div style={{color:T.g2,fontSize:13,marginBottom:22}}>${p?.price||s.base} · {up?"+":""}{p?.pct||0}% · {s.mktCap}</div>
          {aiLoading?(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"56px 0",gap:12}}>
              <div style={{width:38,height:38,border:`3px solid ${T.border2}`,borderTop:`3px solid ${T.green}`,borderRadius:"50%",animation:"spin .9s linear infinite"}}/>
              <div style={{color:T.g2,fontSize:13}}>Analyzing {s.ticker} with Groq AI…</div>
            </div>
          ):sections.map(({label,content},i)=>(
            <div key={i} style={{marginBottom:9,padding:"13px 14px",background:sBg[label]||T.card,borderRadius:13,border:`1px solid ${sColors[label]?sColors[label]+"30":T.border2}`}}>
              <div style={{color:sColors[label]||T.g2,fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:5}}>{label}</div>
              <div style={{color:label==="DISCLAIMER"?T.g2:T.white,fontSize:14,lineHeight:1.6,whiteSpace:"pre-line"}}>{content}</div>
            </div>
          ))}
        </div>
        <div style={{height:22}}/>
      </div>
    );
  };

  const renderPractice=()=>{
    const positions=Object.entries(portfolio.holdings).filter(([,q])=>q>0).map(([ticker,qty])=>{
      const s=STOCKS.find(s=>s.ticker===ticker);const p=prices[ticker];
      return{s,qty,p,val:+((p?.price||s?.base||0)*qty).toFixed(2)};
    });
    return(
      <div>
        <div style={{padding:"22px 20px 0",textAlign:"center"}}>
          <div style={{color:T.g2,fontSize:11,fontWeight:700,letterSpacing:1.8,textTransform:"uppercase",marginBottom:7}}>Paper Portfolio · {userName}</div>
          <div style={{color:T.white,fontSize:44,fontWeight:700,letterSpacing:-1.5,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>${netWorth.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
          <div style={{marginTop:9,display:"inline-flex",alignItems:"center",gap:7,background:pnlUp?T.greenDim:T.redDim,borderRadius:50,padding:"5px 14px"}}>
            <span style={{color:pnlUp?T.green:T.red,fontWeight:700,fontSize:14}}>{pnl>=0?"+":""}${Math.abs(pnl).toFixed(2)} ({pnlPct>=0?"+":""}{ pnlPct}%)</span>
          </div>
          <div style={{color:T.g2,fontSize:12,marginTop:5}}>Starting capital: $10,000</div>
        </div>
        <BigChart history={portHistory} up={pnlUp}/>
        <div style={{display:"flex",gap:1,margin:"13px 20px 0",background:T.border,borderRadius:15,overflow:"hidden"}}>
          {[["Cash",`$${portfolio.cash.toFixed(2)}`,T.green],["Invested",`$${holdingsVal.toFixed(2)}`,T.white],["P&L",`${pnl>=0?"+":""}$${Math.abs(pnl).toFixed(2)}`,pnlUp?T.green:T.red]].map(([l,v,c])=>(
            <div key={l} style={{flex:1,background:T.card,padding:"13px 7px",textAlign:"center"}}>
              <div style={{color:T.g2,fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{l}</div>
              <div style={{color:c,fontWeight:700,fontSize:13,fontVariantNumeric:"tabular-nums"}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{padding:"20px 20px 0"}}>
          <div style={{color:T.g2,fontSize:11,fontWeight:700,letterSpacing:1.8,textTransform:"uppercase",marginBottom:10}}>Tap to Trade</div>
          {STOCKS.map((s,i)=>{
            const p=prices[s.ticker];const up=(p?.pct||0)>=0;const fl=flashMap[s.ticker];
            const held=portfolio.holdings[s.ticker]||0;
            return(
              <div key={s.ticker}>
                <div onClick={()=>{setTradeModal({stock:s,mode:"buy"});setTradeQty("");}} style={{display:"flex",alignItems:"center",gap:13,padding:"12px 0",cursor:"pointer"}}>
                  <div style={{width:40,height:40,borderRadius:12,background:T.card2,border:`1px solid ${held>0?T.green:T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:up?T.green:T.g1,flexShrink:0}}>{s.ticker.slice(0,4)}</div>
                  <div style={{flex:1}}>
                    <div style={{color:T.white,fontWeight:600,fontSize:13}}>{s.ticker} <span style={{color:T.g2,fontSize:11,fontWeight:400}}>{s.name}</span></div>
                    {held>0&&<div style={{color:T.green,fontSize:11,fontWeight:700}}>{held} share{held>1?"s":""} · ${(held*(p?.price||s.base)).toFixed(2)}</div>}
                  </div>
                  <div style={{textAlign:"right",minWidth:74}}>
                    <div style={{color:fl?(fl==="up"?T.green:T.red):T.white,fontWeight:700,fontSize:14,fontVariantNumeric:"tabular-nums",transition:"color 0.4s"}}>${p?.price||s.base}</div>
                    <div style={{color:up?T.green:T.red,fontSize:11,fontWeight:600,marginTop:1}}>{up?"+":""}{p?.pct||0}%</div>
                  </div>
                </div>
                {i<STOCKS.length-1&&<div style={{height:1,background:T.border,marginLeft:53}}/>}
              </div>
            );
          })}
        </div>
        {positions.length>0&&(
          <div style={{padding:"20px 20px 0"}}>
            <div style={{color:T.g2,fontSize:11,fontWeight:700,letterSpacing:1.8,textTransform:"uppercase",marginBottom:10}}>Positions</div>
            {positions.map(({s,qty,p,val},i)=>{
              if(!s)return null;const up=(p?.pct||0)>=0;
              return(
                <div key={s.ticker}>
                  <div style={{display:"flex",alignItems:"center",gap:13,padding:"12px 0"}}>
                    <div style={{width:40,height:40,borderRadius:12,background:T.card2,border:`1px solid ${T.green}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:T.green,flexShrink:0}}>{s.ticker.slice(0,4)}</div>
                    <div style={{flex:1}}><div style={{color:T.white,fontWeight:600,fontSize:13}}>{s.ticker}</div><div style={{color:T.g2,fontSize:11}}>{qty} shares</div></div>
                    <div style={{textAlign:"right"}}>
                      <div style={{color:T.white,fontWeight:700,fontSize:14,fontVariantNumeric:"tabular-nums"}}>${val}</div>
                      <div style={{color:up?T.green:T.red,fontSize:11,fontWeight:600}}>{up?"+":""}{p?.pct||0}%</div>
                    </div>
                  </div>
                  {i<positions.length-1&&<div style={{height:1,background:T.border,marginLeft:53}}/>}
                </div>
              );
            })}
          </div>
        )}
        <div style={{height:22}}/>
      </div>
    );
  };

  const renderBrokers=()=>(
    <div style={{padding:"20px 20px"}}>
      <div style={{color:T.g2,fontSize:11,fontWeight:700,letterSpacing:1.8,textTransform:"uppercase",marginBottom:3}}>Real Investing</div>
      <div style={{color:T.white,fontSize:24,fontWeight:700,letterSpacing:-0.5,marginBottom:3}}>Ready for Real Money?</div>
      <div style={{color:T.g2,fontSize:13,marginBottom:18}}>Open a real account and start your actual investing journey</div>
      <div style={{background:T.card,borderRadius:16,padding:"14px",border:`1px solid ${T.orange}30`,marginBottom:18}}>
        <div style={{color:T.orange,fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:7}}>Before You Start</div>
        <div style={{color:T.g1,fontSize:13,lineHeight:1.65}}>{"✓ Complete at least Chapters 1-2\n✓ Practice with paper trading\n✓ Only invest money you can afford to lose\n✓ Start with index funds (VOO or VTI)\n✓ Automate monthly contributions from day 1"}</div>
      </div>
      {[{name:"Fidelity",emoji:"🏦",stars:5,min:"$0",best:"Best overall",url:"https://www.fidelity.com",color:T.green,tip:"No fees, no minimum, exceptional tools. No payment for order flow. Founded 1946. Our #1 recommendation."},{name:"Schwab",emoji:"🏛️",stars:5,min:"$0",best:"Best support",url:"https://www.schwab.com",color:T.blue,tip:"Exceptional 24/7 customer service. Great educational resources. Very beginner-friendly."},{name:"Vanguard",emoji:"📊",stars:5,min:"$0",best:"Index investors",url:"https://www.vanguard.com",color:T.orange,tip:"Creator of the index fund. Owned by its fund investors. Buy VOO here at the absolute lowest cost."},{name:"Robinhood",emoji:"📱",stars:4,min:"$1",best:"Mobile-first",url:"https://robinhood.com",color:T.purple,tip:"Simplest app. Fractional shares from $1. Instant deposits. Great for small starting budgets."}].map((b,i)=>(
        <div key={b.name} style={{background:T.card,borderRadius:16,padding:"16px",marginBottom:12,border:`1px solid ${b.color}28`}}>
          <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:10}}>
            <div style={{width:44,height:44,borderRadius:13,background:b.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{b.emoji}</div>
            <div style={{flex:1}}><div style={{color:T.white,fontWeight:700,fontSize:15}}>{b.name}</div><div style={{color:T.g2,fontSize:12}}>{"⭐".repeat(b.stars)} · Min: {b.min}</div></div>
            <div style={{background:b.color+"18",borderRadius:50,padding:"3px 9px",color:b.color,fontSize:10,fontWeight:700}}>{b.best}</div>
          </div>
          <div style={{color:T.g1,fontSize:13,lineHeight:1.55,marginBottom:12}}>{b.tip}</div>
          <a href={b.url} target="_blank" rel="noreferrer" style={{display:"block",background:`linear-gradient(135deg,${b.color},${b.color}CC)`,borderRadius:11,padding:"12px",color:"#000",textAlign:"center",fontWeight:800,fontSize:14,textDecoration:"none"}}>Open Free Account →</a>
        </div>
      ))}
      <div style={{background:T.card,borderRadius:16,padding:"16px",border:`1px solid ${T.green}28`,marginBottom:16}}>
        <div style={{color:T.green,fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:7}}>The Simple Strategy</div>
        <div style={{color:T.g1,fontSize:13,lineHeight:1.75}}>{"1. Open Roth IRA at Fidelity\n2. Set $200/month auto-transfer\n3. Auto-invest 100% into VOO\n4. Enable dividend reinvestment\n5. Set annual rebalancing reminder\n6. Check portfolio max once monthly\n7. Leave it alone for 30 years"}</div>
      </div>
      <div style={{height:18}}/>
    </div>
  );

  const renderAdvisor=()=>(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 130px)"}}>
      <div style={{padding:"15px 20px 13px",borderBottom:`1px solid ${T.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:40,height:40,borderRadius:12,background:T.greenDim,border:`1px solid ${T.green}30`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div>
            <div style={{color:T.white,fontWeight:700,fontSize:14}}>Apex · AI Advisor</div>
            <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:T.green}}/>
              <span style={{color:T.g2,fontSize:11}}>Powered by Groq · Educational only</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"14px 20px 8px"}}>
        {chatMsgs.length===0&&(
          <div>
            <div style={{background:T.card,borderRadius:14,padding:"13px 16px",marginBottom:14,border:`1px solid ${T.border2}`,maxWidth:"88%"}}>
              <div style={{color:T.white,fontSize:14,lineHeight:1.65}}>Hey {userName}. I'm Apex — your AI market analyst powered by Groq. Ask me anything about stocks, options, bonds, tax strategy, or anything from the Academy.</div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {["Explain options from scratch","Best ETF for beginners?","How does DCA work?","What moves stock prices?","Roth vs Traditional IRA?","What is a short squeeze?","How to read earnings reports?","What is dollar-cost averaging?"].map(q=>(
                <button key={q} onClick={()=>{setChatInput(q);setTimeout(()=>inputRef.current?.focus(),50);}} style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:50,padding:"7px 12px",fontSize:12,color:T.g1,cursor:"pointer",fontFamily:T.font}}>{q}</button>
              ))}
            </div>
          </div>
        )}
        {chatMsgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:12,alignItems:"flex-end",gap:7}}>
            {m.role==="assistant"&&<div style={{width:26,height:26,borderRadius:8,background:T.greenDim,border:`1px solid ${T.green}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg></div>}
            <div style={{maxWidth:"80%",padding:"11px 14px",borderRadius:m.role==="user"?"15px 15px 3px 15px":"15px 15px 15px 3px",background:m.role==="user"?T.green:T.card,border:m.role==="assistant"?`1px solid ${T.border2}`:"none"}}>
              {m.role==="assistant"?m.content.split("\n").map((l,j)=>l.trim()?<p key={j} style={{color:T.white,fontSize:13,lineHeight:1.7,marginBottom:3}}>{l}</p>:<div key={j} style={{height:5}}/>):<div style={{color:"#000",fontWeight:600,fontSize:14}}>{m.content}</div>}
            </div>
          </div>
        ))}
        {chatLoading&&<div style={{display:"flex",alignItems:"flex-end",gap:7,marginBottom:12}}>
          <div style={{width:26,height:26,borderRadius:8,background:T.greenDim,border:`1px solid ${T.green}30`,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg></div>
          <div style={{background:T.card,borderRadius:"15px 15px 15px 3px",padding:"11px 14px",border:`1px solid ${T.border2}`}}><div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:T.g2,animation:`blink 1.2s ease ${i*0.15}s infinite`}}/>)}</div></div>
        </div>}
        <div ref={chatEndRef}/>
      </div>
      <div style={{padding:"9px 14px 13px",borderTop:`1px solid ${T.border}`,display:"flex",gap:9,alignItems:"center"}}>
        <input ref={inputRef} value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask about markets, options, strategy…" style={{flex:1,background:T.card,border:`1px solid ${T.border2}`,borderRadius:50,padding:"11px 16px",fontSize:14,outline:"none",color:T.white,fontFamily:T.font}}/>
        <button onClick={sendChat} disabled={chatLoading} style={{width:42,height:42,background:chatLoading?T.border2:T.green,border:"none",borderRadius:"50%",cursor:chatLoading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .2s"}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={chatLoading?T.g2:"#000"} strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  );

  const renderMain=()=>{
    if(sub==="chapter")return renderChapter();
    if(sub==="lesson")return renderLesson();
    if(sub==="quiz")return renderQuiz();
    if(sub==="stock")return renderStock();
    if(sub==="ai")return renderAI();
    switch(tab){
      case"academy":return renderAcademy();
      case"markets":return renderMarkets();
      case"practice":return renderPractice();
      case"brokers":return renderBrokers();
      case"advisor":return renderAdvisor();
      default:return renderAcademy();
    }
  };

  return(
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${T.bg};}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
        @keyframes blink{0%,100%{opacity:.25}50%{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        ::-webkit-scrollbar{width:0;}
        input::placeholder{color:${T.g2};}
        button{-webkit-tap-highlight-color:transparent;}
        a{transition:opacity .15s;}a:hover{opacity:.85;}
      `}</style>
      <div style={{minHeight:"100vh",background:T.bg,fontFamily:T.font,color:T.white,WebkitFontSmoothing:"antialiased"}}>
        <div style={{maxWidth:430,margin:"0 auto",position:"relative",minHeight:"100vh"}}>
          <div style={{background:T.surface,padding:"11px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:20}}>
            <div style={{fontWeight:800,fontSize:16,color:T.white,letterSpacing:-0.3}}>📈 StockSense</div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <div style={{background:T.greenDim,border:`1px solid ${T.green}30`,borderRadius:50,padding:"3px 9px",color:T.green,fontSize:11,fontWeight:600}}>{completed.length}/{totalLessons} lessons</div>
              <div style={{background:T.card2,border:`1px solid ${T.border2}`,borderRadius:50,padding:"3px 9px",color:T.g1,fontSize:11,fontWeight:600}}>⚡{xp} XP</div>
            </div>
          </div>
          <div style={{paddingBottom:82,animation:"fadeUp .2s ease"}}>{renderMain()}</div>
          {tradeModal&&(()=>{
            const {stock,mode}=tradeModal;const p=prices[stock.ticker];
            const qty=parseInt(tradeQty)||0;const total=+((p?.price||stock.base)*qty).toFixed(2);
            const isBuy=mode==="buy";const held=portfolio.holdings[stock.ticker]||0;
            return(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",zIndex:100,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={e=>{if(e.target===e.currentTarget){setTradeModal(null);setTradeQty("");}}} >
                <div style={{background:T.surface,borderRadius:"22px 22px 0 0",padding:"18px 20px 40px",width:"100%",maxWidth:430,animation:"slideUp .26s ease",borderTop:`1px solid ${T.border2}`}}>
                  <div style={{width:38,height:4,background:T.border2,borderRadius:2,margin:"0 auto 18px"}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                    <div><div style={{color:T.white,fontWeight:700,fontSize:19}}>{isBuy?"Buy":"Sell"} {stock.ticker}</div><div style={{color:T.g2,fontSize:13,marginTop:2}}>${p?.price||stock.base}/share · {isBuy?`$${portfolio.cash.toFixed(2)} available`:`${held} owned`}</div></div>
                    <button onClick={()=>{setTradeModal(null);setTradeQty("");}} style={{background:T.card2,border:`1px solid ${T.border2}`,color:T.g1,borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:15}}>✕</button>
                  </div>
                  <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:"16px",margin:"14px 0"}}>
                    <div style={{color:T.g2,fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:7}}>Shares</div>
                    <input value={tradeQty} onChange={e=>setTradeQty(e.target.value.replace(/\D/,""))} placeholder="0" type="number" min="1"
                      style={{background:"none",border:"none",color:T.white,fontSize:34,fontWeight:700,outline:"none",width:"100%",fontVariantNumeric:"tabular-nums",fontFamily:T.font}}/>
                    {qty>0&&<div style={{color:T.g2,fontSize:13,marginTop:3}}>Total: <span style={{color:T.white,fontWeight:700}}>${total}</span></div>}
                  </div>
                  <div style={{display:"flex",gap:7,marginBottom:16}}>
                    {[1,5,10,25].map(n=><button key={n} onClick={()=>setTradeQty(String(n))} style={{flex:1,background:tradeQty===String(n)?T.greenDim:T.card2,border:`1px solid ${tradeQty===String(n)?T.green:T.border2}`,color:tradeQty===String(n)?T.green:T.g2,borderRadius:9,padding:"8px 0",fontSize:13,fontWeight:600,cursor:"pointer"}}>{n}</button>)}
                  </div>
                  <button onClick={()=>executeTrade(mode)} style={{width:"100%",background:isBuy?T.green:T.red,border:"none",borderRadius:13,padding:"16px",color:"#000",fontWeight:800,fontSize:16,cursor:"pointer",fontFamily:T.font}}>
                    {isBuy?"Buy Now":"Sell Shares"}
                  </button>
                </div>
              </div>
            );
          })()}
          {toast&&<div style={{position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",background:toast.ok?T.green:T.red,color:"#000",borderRadius:50,padding:"10px 20px",fontWeight:700,fontSize:13,zIndex:200,whiteSpace:"nowrap",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",animation:"toastIn .2s ease",fontFamily:T.font}}>{toast.msg}</div>}
          <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:T.surface,borderTop:`1px solid ${T.border}`,display:"flex",zIndex:20}}>
            {NAV.map(n=>{
              const active=tab===n.id&&!sub;
              return(
                <button key={n.id} onClick={()=>{setTab(n.id);setSub(null);}}
                  style={{flex:1,padding:"10px 0 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",background:"none",border:"none",color:active?T.green:T.g2,transition:"color .15s",fontFamily:T.font,position:"relative"}}>
                  <div style={{transform:active?"scale(1.08)":"scale(1)",transition:"transform .15s"}}>{n.icon}</div>
                  <div style={{fontSize:9,fontWeight:active?700:400,letterSpacing:.5,textTransform:"uppercase"}}>{n.label}</div>
                  {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:24,height:2,background:T.green,borderRadius:"0 0 2px 2px"}}/>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
